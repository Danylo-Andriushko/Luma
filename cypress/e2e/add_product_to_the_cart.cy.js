import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
const cart = new Cart();
const mainPage = Pages.main_page;
const productsPage = Pages.products_page;
const productPage = Pages.product_page;

describe('Add product to the cart feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('User should add one product to the cart', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    productPage.checkIfProductIsAdded();
    cart.cartIconNumberIs(1);
  })

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
