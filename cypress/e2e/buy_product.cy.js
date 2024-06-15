import Pages from '../support/pages/pagesFactory.js';
import { ProductUtils } from '../utils/product_helpers.js';

const productActions = new ProductUtils();
const mainPage = Pages.main_page;
const paymentPage = Pages.payment_page;
const checkoutPage = Pages.checkout_page;
const cartPage = Pages.cart_page;
const successPage = Pages.success_page;
const { 
  randomEmail, 
  randomFirstName, 
  randomLastName,  
  randomCompany, 
  randomStreetAddress, 
  randomCountry, 
  randomCity, 
  randomState, 
  randomPostalCode, 
  randomPhone 
} = checkoutPage.checkoutData;

describe('Buy product feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('Checkout fields should have descriptions and marked with "*"', () => {
    productActions.addProductToTheCart("S", "Blue", 1);
    cartPage.open();
    cartPage.openCheckoutPage();
    checkoutPage.checkCheckoutAttributesFields();
    checkoutPage.checkCheckoutRequiredAttributesFields();
  })

  it('Guest user should be able to order the product', () => {
    productActions.addProductToTheCart("S", "Blue", 1);
    cartPage.open();
    cartPage.openCheckoutPage();
    checkoutPage.inputCheckoutData(
      randomEmail,
      randomFirstName,
      randomLastName,
      randomCompany,
      randomStreetAddress,
      randomCountry,
      randomCity,
      randomState,
      randomPostalCode,
      randomPhone
    );
    checkoutPage.clickNextButton();
    paymentPage.confirmOrder();
    successPage.checkIfOrderIsSuccessfull();
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
