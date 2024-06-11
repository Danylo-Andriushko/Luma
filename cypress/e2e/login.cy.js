import { Header } from '../support/elements/header.js';
import { PageMessage } from '../support/elements/messages.js';
import Pages from '../support/pages/pagesFactory.js';
import messageData from "../fixtures/message_data.json";

const header = new Header();
const pageMessage = new PageMessage();
const mainPage = Pages.main_page;
const homePage = Pages.home_page;
const loginPage = Pages.login_page;


describe('Login feature', () => {
  beforeEach('Open main page', () => {
    mainPage.open();
  })

  it('Check Sign In button available from all pages', () => {
    header.availableFromAllContentPages('signInButton');
  })

  it('Login required fields should have descriptions and marked with "*"', () => {
    header.signInButton().click({multiple:true})
    loginPage.checkLoginAttributesFields();
    loginPage.checkLoginRequiredAttributesFields();
  })

  it('User is able to login with valid credentials', () => {
    header.signInButton().click({multiple:true})
    loginPage.signIn(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    homePage.checkPageUrl();
  })

  it('Login with invalid password', () => {
    header.signInButton().click({multiple:true});
    loginPage.signIn(Cypress.env('USER_EMAIL'), Cypress.env('INVALID_PASSWORD'));
    pageMessage.pageMessageText().should('eq', messageData.errorPasswordMessage);
  })

  it('Login with invalid email', () => {
    header.signInButton().click({multiple:true});
    loginPage.signIn(Cypress.env('INVALID_EMAIL'), Cypress.env('USER_PASSWORD'));
    loginPage.emailErrorMessageText().should('eq', messageData.errorEmailMessage);
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
