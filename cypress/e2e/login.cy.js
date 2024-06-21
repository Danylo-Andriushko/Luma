import { Header } from '../support/elements/header.js';
import { PageMessage } from '../support/elements/messages.js';
import Pages from '../support/pages/pagesFactory.js';
import messageData from "../fixtures/message_data.json";

const validEmail = Cypress.env('USER_EMAIL');
const validPassword = Cypress.env('USER_PASSWORD');
const invalidEmail = Cypress.env('INVALID_EMAIL');
const invalidPassword = Cypress.env('INVALID_PASSWORD');

const header = new Header();
const pageMessage = new PageMessage();
const mainPage = Pages.main_page;
const homePage = Pages.home_page;
const loginPage = Pages.login_page;


describe('Login feature', () => {
  beforeEach('Open main page', () => {
    mainPage.open();
  })

  it('Sign In button should be available from all pages', () => {
    header.checkIfAvailableFromAllContentPages('signInButton');
  })

  it('Login required fields should have descriptions and marked with "*"', () => {
    header.signInButton().click({multiple:true});
    loginPage.checkLoginAttributesFields();
    loginPage.checkLoginRequiredAttributesFields();
  })

  it('User should be able to login with valid credentials', () => {
    header.signInButton().click({multiple:true});
    loginPage.signIn(validEmail, validPassword);
    homePage.checkPageUrl();
  })

  it('Login with invalid password', () => {
    header.signInButton().click({multiple:true});
    loginPage.signIn(validEmail, invalidPassword);
    pageMessage.pageMessageText().should('eq', messageData.errorPasswordMessage);
  })

  it('Login with invalid email', () => {
    header.signInButton().click({multiple:true});
    loginPage.signIn(invalidEmail, validPassword);
    loginPage.emailErrorMessageText().should('eq', messageData.errorEmailMessage);
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
