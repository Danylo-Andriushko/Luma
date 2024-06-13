import { Header } from '../support/elements/header.js';
import Pages from '../support/pages/pagesFactory.js';
const header = new Header();
const mainPage = Pages.main_page;
const create_account_page = Pages.create_account_page;
const account = Pages.account_page;


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
      create_account_page.registrationData.randomFirstName,
      create_account_page.registrationData.randomLastName,
      create_account_page.registrationData.randomEmail,
      create_account_page.registrationData.randomPassword,
    );
    create_account_page.clickCreateAnAccountButton();
    create_account_page.checkIfRegistrationMessageIsSuccessful()
    account.checkPageUrl();
  })

  afterEach('clear cookie values', () => {
    cy.clearCookies();
  })
})
