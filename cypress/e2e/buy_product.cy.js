import { urls } from "../utils/pages_url.js";
import Pages from '../support/pages/pagesFactory.js';
import { ProductUtils } from '../utils/product_helpers.js';

const productHelpers = new ProductUtils();
const mainPage = Pages.main_page;
const paymentPage = Pages.payment_page;
const checkoutPage = Pages.checkout_page;
const cartPage = Pages.cart_page;
const successPage = Pages.success_page;


describe('A guest user buy product', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('Checkout fields should have descriptions and marked with "*"', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1);
    cy.visit(urls.cartPage);
    cartPage.openCheckoutPage();
    checkoutPage.checkCheckoutAttributesFields();
    checkoutPage.checkCheckoutRequiredAttributesFields();
  })

  it('User is able to order the product', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1);
    cy.visit(urls.cartPage);
    cartPage.openCheckoutPage();
    checkoutPage.inputCheckoutData();
    paymentPage.confirmOrder();
    successPage.orderIsSuccessFull();
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
