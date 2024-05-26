import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
const productCart = new Cart();
const mainPage = Pages.main_page;
const productsPage = Pages.products_page;
const productPage = Pages.product_page;

describe('add products to the chart', () => {
  beforeEach('login to te application', () => {
    mainPage.open();
  })

  it('add product to the cart from current product page', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    productPage.productIsAdded();
    productCart.cartNumberIs(1);
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
