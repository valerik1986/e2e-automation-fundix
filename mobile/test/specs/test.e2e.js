const SignInPage = require('../pageobjects/signin-page');
const HomePage = require('../pageobjects/home-page');
const MarketsPage = require('../pageobjects/markets-page');
const PortfolioPage = require('../pageobjects/portfolio-page');
const ProfilePage = require('../pageobjects/profile-page');

describe('Fundix App - Login, Markets, and Portfolio Flow', () => {
  it('Should log in successfully', async () => {
    await SignInPage.waitForScreen();
    await SignInPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    await HomePage.waitForHomePageDisplayed();
  });

  it('Should navigate between Portfolio and More tabs', async () => {
    await HomePage.tapTab('portfolioTab');
    await HomePage.tapTab('moreTab');
  });

  it('Should open Markets tab and verify Markets header', async () => {
    await HomePage.tapTab('marketsTab');
    const isDisplayed = await MarketsPage.waitForMarketsHeader();
    if (!isDisplayed) throw new Error('Markets header not displayed after navigation');
  });

  it('Should scroll to USD/JPY market item and open it', async () => {
    await MarketsPage.openMarketItem('usdJpyMarketsListItem', { maxAttempts: 8 });
  });

  it('Should perform Sell flow inside USD/JPY market', async () => {
    await MarketsPage.tapOneHourTimeframe();
    await MarketsPage.tapSellButton();
    await MarketsPage.buySellBottomSheetDisplayed();
    await MarketsPage.chooseAmount('5000');
    await MarketsPage.tapSellNowButton();
  });

  it('Should verify and close position from Portfolio tab', async () => {
    await HomePage.tapTab('portfolioTab');
    
    const cardVisible = await PortfolioPage.portfolioHeaderCardDisplayed();
    if (!cardVisible) throw new Error('Portfolio header card not visible');
    
    const headerVisible = await PortfolioPage.portfolioHeaderCardTitleTextDisplayed('$5,000');
    if (!headerVisible) throw new Error('Portfolio header text mismatch');
    
    await PortfolioPage.tapOnPosition();
    
    const positionHeader = await PortfolioPage.openPositionWindowHeaderDisplayed('Open position');
    if (!positionHeader) throw new Error('Open Position window header mismatch');
    
    await PortfolioPage.tapPortfolioPositionCloseButton();
    await PortfolioPage.closePositionScreenDisplayed();
    
    const amountVisible = await PortfolioPage.closePositionAmountInputDisplayed('5000.000');
    if (!amountVisible) throw new Error('Close position amount input not displayed');
    
    await PortfolioPage.tapClosePositionConfirmButton();
    
    const isEmpty = await PortfolioPage.portfolioEmptyListTitleTextDisplayed('No open positions');
    if (!isEmpty) throw new Error('Portfolio list is not empty after closing position');
  });

  it('Should log out from profile', async () => {
    await HomePage.tapHeaderAvatar();
    
    const nameVisible = await ProfilePage.profileHeaderFullNameDisplayed('Trader ');
    if (!nameVisible) throw new Error('Profile full name not displayed');
    
    await ProfilePage.scrollAndClickSignOutButton();
    
    const popUpVisible = await ProfilePage.logOutPopUpDisplayed();
    if (!popUpVisible) throw new Error('Log Out pop-up not displayed');
    
    await ProfilePage.tapLogOutButton();
    await SignInPage.waitForScreen();
  });
});