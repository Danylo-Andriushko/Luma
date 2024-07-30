import { Header } from '../support/elements/header.js';
import { registrationData } from '../fixtures/registration_data.js';
import Pages from '../support/pages/pagesFactory.js';

const header = new Header();
const mainPage = Pages.main_page;
const create_account_page = Pages.create_account_page;
const account = Pages.account_page;

const { 
  randomFirstName, 
  randomLastName, 
  randomEmail, 
  randomPassword 
} = registrationData;


describe('Registration feature', () => {
  beforeEach('Open main page', () => {
    mainPage.open();
  })

  it('An Account Link should be available from all pages', () => {
    header.checkIfAvailableFromAllContentPages('createAnAccountLink');
  })

  it('Registration fields should have descriptions and marked with "*"', () => {
    header.createAnAccountLink().click({ force: true });
    create_account_page.checkRegistrationAttributesFields();
    create_account_page.checkRegistrationRequiredAttributesFields();
  })

  it('New user should be able to register with valid data', () => {
    header.createAnAccountLink().click({ force: true });
    create_account_page.inputRegistrationData(
      randomFirstName,
      randomLastName,
      randomEmail,
      randomPassword,
    );
    create_account_page.clickCreateAnAccountButton();
    create_account_page.checkIfRegistrationMessageIsSuccessful()
    account.checkPageUrl();
  })

  afterEach('clear cookie values', () => {
    cy.clearCookies();
  })
})
