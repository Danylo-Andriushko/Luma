import { Cart } from '../support/elements/cart.js';
import { PageMessage } from '../support/elements/messages.js';
import Pages from '../support/pages/pagesFactory.js';
import { ProductUtils } from '../utils/product_manager';
import { shippingRandomData } from "../fixtures/shipping_data";

const productActions = new ProductUtils();
const cart = new Cart();
const pageMessage = new PageMessage();
const mainPage = Pages.main_page;
const paymentPage = Pages.payment_page;
const shippingPage = Pages.shipping_page;
const cartPage = Pages.cart_page;
const successPage = Pages.success_page;
const productsPage = Pages.products_page;
const productPage = Pages.product_page;
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
} = shippingRandomData;

describe('Buy product as a guest user feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('User should selects product options', () => {
      mainPage.selectProductsGroup();
      productsPage.selectProduct(1);
      productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
      productPage.checkIfOptionsIs('selected');
    });

  it('User should be able to add product to the cart', () => {
      productActions.selectCustomizedProduct("S", "Blue", 1, 1);
      productPage.addButton().click({ multiple: true });
      productPage.productTitle().then((title) => {
        return pageMessage.pageMessageText().should('include', `You added ${title} to your shopping cart.`);
    })
      cart.isCartIconProductQuantityEqualTo(1);
    });

  it('User should be able to checkout order', () => {
      productActions.addProductToTheCart("S", "Blue", 1, 1);
      cartPage.open();
      cartPage.openShippingPage();

      shippingPage.inputCheckoutData(
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

      shippingPage.clickNextButton();
      paymentPage.checkPageUrl();
    });

  it('The payment information on the payment page should be exist', () => {
    productActions.addProductToTheCart("S", "Blue", 1, 1);
    cartPage.open();
    cartPage.openShippingPage();
    shippingPage.checkoutOrder();
    shippingPage.clickNextButton();
    paymentPage.paymentInformation().forEach(paymentInfoBlocks => {
        paymentInfoBlocks.should('be.exist');
      });
  })

  it('The error message should be displayed when user input invalid discount code', () => {
    productActions.addProductToTheCart("S", "Blue", 1, 1);
    cartPage.open();
    cartPage.openShippingPage();
    shippingPage.checkoutOrder();
    shippingPage.clickNextButton();
    paymentPage.inputDiscount(1111);
    paymentPage.couponErrorMessage().should('eq', "The coupon code isn't valid. Verify the code and try again.");
  })

  it('User should be able to confirm order', () => {
    productActions.addProductToTheCart("S", "Blue", 1, 1);
    cartPage.open();
    cartPage.openShippingPage();
    shippingPage.checkoutOrder();
    shippingPage.clickNextButton();
    paymentPage.confirmOrder();
    successPage.checkPageUrl();
    successPage.confirmationMessage().should('eq', 'Thank you for your purchase!')
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
