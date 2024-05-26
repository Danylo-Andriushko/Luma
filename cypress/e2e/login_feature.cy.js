import Pages from '../support/pages/pagesFactory.js';

const mainPage = Pages.main_page;
const homePage = Pages.home_page;
const header = Pages.header;
const loginPage = Pages.login_page;


describe('login feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('Check Sign In button available from all pages', () => {
    header.signInButtonIsAvailableFromAllContentPages();
  })

  it('Verify that login required fields have descriptions and marked with "*"', () => {
    header.signInButton().click({multiple:true})
    loginPage.checkLoginAttributesFields();
    loginPage.checkLoginRequiredAttributesFields();
    
  })

  it('Login with valid credentials', () => {
    header.signInButton().click({multiple:true})
    loginPage.signIn(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    homePage.checkPageUrl()
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
