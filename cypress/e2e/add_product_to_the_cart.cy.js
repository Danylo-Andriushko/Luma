import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
const cart = new Cart();
const mainPage = Pages.main_page;
const productsPage = Pages.products_page;
const productPage = Pages.product_page;

describe('A guest user add product to the cart', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('User is able to add one product to the cart', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    productPage.productIsAdded();
    cart.cartIconNumberIs(1);
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
