class LandingPage {

  visit() {
    cy.visit('/');
  }

  getLogo() {
    return cy.contains('Fundix', { timeout: 10000 });
  }

  getCTAButton() {
    return cy.contains('a, button', 'Get funded', { timeout: 10000 });
  }

  getFAQLink() {
    return cy.contains('a', 'FAQ', { timeout: 10000 });
  }

  getWhyUsLink() {
    return cy.get('a[href*="why-us"], a[href*="#why-us"]', { timeout: 10000 }).first();
  }

  getMainContent() {
    return cy.get('main, [role="main"], .main, .content, #content', { timeout: 10000 }).first();
  }
}

module.exports = new LandingPage();