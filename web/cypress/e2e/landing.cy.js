require('cypress-xpath');
const LandingPage = require('../pageObjects/LandingPage');

describe('Fundix Landing Page Tests', () => {

  beforeEach(() => {
    LandingPage.visit();
    cy.on('uncaught:exception', () => false);
  });

  it('should load the landing page successfully', () => {
    cy.contains('Join our free internship', { timeout: 15000 }).should('be.visible');
  });

  it('should display logo and navigation links', () => {
    LandingPage.getLogo().should('be.visible');
    cy.contains('a', 'How it works').should('be.visible');
    cy.contains('a', 'Why us').should('be.visible');
    cy.contains('a', 'Pro traders').should('be.visible');
    cy.contains('a', 'FAQ').should('be.visible');
  });

  it('should have CTA button visible and clickable', () => {
    LandingPage.getCTAButton().should('be.visible').click();
  });

  it('should have valid Google Play link and correct app name on the store page', () => {
    cy.request('https://fundix.pro/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('play.google.com/store/apps/details?id=com.amega.fundix');
    });

    cy.request('https://play.google.com/store/apps/details?id=com.amega.fundix').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Fundix.pro');
    });
  });

  it('should open FAQ page', () => {
    LandingPage.getFAQLink().click({ force: true });
    cy.url().should('include', '/faq');
  });
});