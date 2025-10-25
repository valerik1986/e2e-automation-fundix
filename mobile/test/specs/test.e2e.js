const SignInPage = require('../pageobjects/signin-page');
const HomePage = require('../pageobjects/home-page');
const MarketsPage = require('../pageobjects/markets-page');
const PortfolioPage = require('../pageobjects/portfolio-page');
const ProfilePage = require('../pageobjects/profile-page');

describe('Fundix App - Login, Markets, and Portfolio Flow', () => {
  before(async () => {
    console.log('🚀 Starting Fundix E2E flow...');
  });

  /* ---------- STEP 1: LOGIN ---------- */
  it('Should log in successfully', async () => {
    console.log('🔐 Performing login...');
    await SignInPage.waitForScreen();
    await SignInPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    console.log('⏳ Waiting for Home screen...');
    await HomePage.waitForHomePageDisplayed();
    console.log('✅ Home screen loaded after login.');
  });

  /* ---------- STEP 2: NAVIGATE TABS ---------- */
  it('Should navigate between Portfolio and More tabs', async () => {
    console.log('📱 Navigating through tabs...');
    await HomePage.tapTab('portfolioTab');
    console.log('✅ Clicked Portfolio tab.');

    await HomePage.tapTab('moreTab');
    console.log('✅ Clicked More tab.');
  });

  /* ---------- STEP 3: OPEN MARKETS TAB ---------- */
  it('Should open Markets tab and verify Markets header', async () => {
    console.log('📊 Opening Markets tab...');
    await HomePage.tapTab('marketsTab');

console.log('⏳ Waiting for Markets header...');
const isDisplayed = await MarketsPage.waitForMarketsHeader();
if (!isDisplayed) throw new Error('❌ Markets header not displayed after navigation.');
    console.log('✅ Markets header displayed successfully.');
  });

  /* ---------- STEP 4: SCROLL AND OPEN USD/JPY ---------- */
  it('Should scroll to USD/JPY market item and open it', async () => {
    console.log('🔍 Scrolling to USD/JPY...');
    await MarketsPage.openMarketItem('usdJpyMarketsListItem', { maxAttempts: 8 });
    console.log('✅ USD/JPY market item opened successfully.');
  });

  /* ---------- STEP 5: PERFORM SELL ACTION ---------- */
  it('Should perform Sell flow inside USD/JPY market', async () => {
    console.log('🕒 Selecting 1H timeframe...');
    await MarketsPage.tapOneHourTimeframe();

    console.log('💸 Tapping Sell button...');
    await MarketsPage.tapSellButton();

    console.log('⏳ Waiting for Buy/Sell bottom sheet...');
    await MarketsPage.buySellBottomSheetDisplayed();

    console.log('💰 Choosing amount and confirming Sell Now...');
    await MarketsPage.chooseAmount('5000');
    await MarketsPage.tapSellNowButton();

    console.log('✅ Sell flow completed successfully.');
  });

  /* ---------- STEP 6: VERIFY AND CLOSE POSITION IN PORTFOLIO ---------- */
  it('Should verify and close position from Portfolio tab', async () => {
  console.log('📊 Navigating to Portfolio tab...');
  await HomePage.tapTab('portfolioTab');

console.log('⏳ Checking portfolio header...');
const cardVisible = await PortfolioPage.portfolioHeaderCardDisplayed();
if (!cardVisible) throw new Error('❌ Portfolio header card not visible.');

  const headerVisible = await PortfolioPage.portfolioHeaderCardTitleTextDisplayed('$5,000');
  if (!headerVisible) throw new Error('❌ Portfolio header text mismatch.');

  console.log('📈 Opening position (e.g., USD/JPY)...');
  await PortfolioPage.tapOnPosition();

  console.log('⏳ Verifying position window header...');
  const positionHeader = await PortfolioPage.openPositionWindowHeaderDisplayed('Open position');
  if (!positionHeader) throw new Error('❌ Open Position window header mismatch.');

  console.log('❌ Tapping Close Position button...');
  await PortfolioPage.tapPortfolioPositionCloseButton();

  console.log('⏳ Waiting for Close Position screen...');
  await PortfolioPage.closePositionScreenDisplayed();

  console.log('💰 Checking amount input field...');
  const amountVisible = await PortfolioPage.closePositionAmountInputDisplayed('5000.000');
  if (!amountVisible) throw new Error('❌ Close position amount input not displayed.');

  console.log('✅ Confirming position closure...');
  await PortfolioPage.tapClosePositionConfirmButton();

  console.log('📭 Checking empty portfolio list...');
  const isEmpty = await PortfolioPage.portfolioEmptyListTitleTextDisplayed('No open positions');
  if (!isEmpty) throw new Error('❌ Portfolio list is not empty after closing position.');

  console.log('🎯 Portfolio close flow completed successfully.');
});

/* ---------- STEP 7: LOGOUT FLOW ---------- */
it('Should log out from profile', async () => {
  console.log('👤 Opening profile from header...');
  await HomePage.tapHeaderAvatar();

  console.log('⏳ Waiting for profile header...');
  const nameVisible = await ProfilePage.profileHeaderFullNameDisplayed('Trader ');
  if (!nameVisible) throw new Error('❌ Profile full name not displayed.');

  console.log('📜 Scrolling to and clicking Sign Out...');
  await ProfilePage.scrollAndClickSignOutButton();

  console.log('⏳ Waiting for Log Out confirmation pop-up...');
  const popUpVisible = await ProfilePage.logOutPopUpDisplayed();
  if (!popUpVisible) throw new Error('❌ Log Out pop-up not displayed.');

  console.log('👋 Confirming logout...');
  await ProfilePage.tapLogOutButton();

  console.log('🔒 Verifying return to Sign In screen...');
  await SignInPage.waitForScreen();

  console.log('✅ Successfully logged out.');
});

});