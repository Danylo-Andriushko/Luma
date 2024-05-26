import Pages from '../support/pages/pagesFactory.js';

const mainPage = Pages.main_page;
const header = Pages.header;
const create_account_page = Pages.create_account_page;
const account = Pages.account_page;


describe('login feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
    header.createAnAccountLink().click({ force: true });
  })

  it('Verify that registration fields have descriptions and marked with "*"', () => {
    create_account_page.checkRegistrationAttributesFields();
    create_account_page.checkRegistrationRequiredAttributesFields();
  })

  it('Verify fields with valid data', () => {
    header.createAnAccountLink().click({ force: true });
    create_account_page.inputRegistrationData();
    account.checkPageUrl();
  })

  afterEach('clear cookies values', () => {
    cy.clearCookies();
  })
})
