import { Header } from '../support/elements/header.js';
import Pages from '../support/pages/pagesFactory.js';
import { loginToTheApplication, signOut } from '../utils/login_manager.js';
import { checkIfLocalStorageIsNotContainData } from '../utils/session_handler.js';

const validEmail = Cypress.env('USER_EMAIL');
const validPassword = Cypress.env('USER_PASSWORD');

const header = new Header();
const homePage = Pages.home_page;
const logOutPage = Pages.logout_page;
const loginPage = Pages.login_page;
const myAccountPage = Pages.account_page;


describe('Sign-out feature', () => {
  beforeEach('Sign-in to the application', () => {
    loginToTheApplication(validEmail, validPassword);
    signOut();
  })

  it('Upon signing out user should navigate to the "Logout success" page with success message', () => {
    logOutPage
    .checkPageUrl()
    .checkPageWithSuccessMessage('You are signed out You have signed out and will go to our homepage in 5 seconds.')
  })

  it('Upon signing out user should navigate to the "Home" page from "Logout success" page after 5 seconds', () => {
    logOutPage.waitFiveSeconds();
    homePage.checkPageUrl();
  })

  it('After signing out application shouldn"t contain any user storage data', () => {
    checkIfLocalStorageIsNotContainData('fullname', 'firstname')
  });

  it('User shouldn"t have any access to "My Account" features', () => {
    header.userMenu().should('not.exist');
  });

  it('User should be able to sign-in again to have access to "My Account" features', () => {
    header.signInButton().click({force: true});
    loginPage.signIn(validEmail, validPassword);
    myAccountPage.checkPageUrl();
  });
})
