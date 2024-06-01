import { Header } from '../support/elements/header.js';
import Pages from '../support/pages/pagesFactory.js';

const mainPage = Pages.main_page;
const homePage = Pages.home_page;
const header = new Header();
const loginPage = Pages.login_page;


describe('Login feature', () => {
  beforeEach('Open main page', () => {
    mainPage.open();
  })

  it('Check Sign In button available from all pages', () => {
    header.availableFromAllContentPages('signInButton');
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
