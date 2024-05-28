import Pages from '../support/pages/pagesFactory.js';

const mainPage = Pages.main_page;
const header = Pages.header;
const create_account_page = Pages.create_account_page;
const account = Pages.account_page;


describe('Registration feature', () => {
  beforeEach('Open main page', () => {
    mainPage.open();
  })

  it('Check Create An Account Link available from all pages', () => {
    header.availableFromAllContentPages('createAnAccountLink');
  })

  it('Verify that registration fields have descriptions and marked with "*"', () => {
    header.createAnAccountLink().click({ force: true });
    create_account_page.checkRegistrationAttributesFields();
    create_account_page.checkRegistrationRequiredAttributesFields();
  })

  it('Verify registration new user with valid data', () => {
    header.createAnAccountLink().click({ force: true });
    create_account_page.inputRegistrationData()
    create_account_page.registrationMessageIsSuccessful()
    account.checkPageUrl();
  })

  afterEach('clear cookies values', () => {
    cy.clearCookies();
  })
})
