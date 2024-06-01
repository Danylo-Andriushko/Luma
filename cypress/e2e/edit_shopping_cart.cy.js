import { Cart } from '../support/elements/cart.js';
import { Header } from '../support/elements/header.js';
import Pages from '../support/pages/pagesFactory.js';
import { urls } from "../fixtures/pages_url.js";
import { changeProductQuantityTo, productsSubtotal } from "../fixtures/shopping_cart"

const header = new Header();
const cart = new Cart();
const mainPage = Pages.main_page;
const productsPage = Pages.products_page;
const productPage = Pages.product_page;
const cartPage = Pages.cart_page;

describe('Edit cart', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  it('Edit product quantity in the mini cart', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    cart.clickCartIcon();
    productsSubtotal(cart.productPrice()).then((initialPrice) => {
      changeProductQuantityTo(5, cart.miniCartQuantityInput(), 
      cart.updateProductQuantityButton());
      cart.cartQuantity().should('eq', 5);
      productsSubtotal(cart.productPrice()).then((changedSum) => {
        cart.cartQuantity().then((cartNum) => {
          expect(changedSum).to.eq(initialPrice * cartNum);
        });
      });
    });
  });

  it('Delete product from mini cart', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    cart.clickCartIcon();
    cart.deleteProducts();
    cart.miniCartEmptyPopup().should('eq', 'You have no items in your shopping cart.')
  });

  it('Edit product quantity in the Cart page', () => {
    mainPage.selectProductsGroup();
    productsPage.selectProduct(1);
    productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
    cy.visit(urls.cartPage)
    productsSubtotal(cartPage.productPrice()).then((initialPrice) => {
    changeProductQuantityTo(5, cartPage.cartQuantityInput(), cartPage.updateShoppingCartButton());
    cartPage.productQuantity().should('eq', 5);
    productsSubtotal(cartPage.productPrice()).then((changedSum) => {
      cartPage.productQuantity().then((cartNum) => {
        expect(changedSum).to.eq(initialPrice * cartNum);
      });
    });
  });
  });

  it('Delete products from Cart page', () => {
      mainPage.selectProductsGroup();
      productsPage.selectProduct(1);
      productPage.customizeProductOnTheCurrentPage("S", "Blue", 1);
      cy.visit(urls.cartPage)
      cartPage.deleteProductsFromCartPage();
      cartPage.emptyCartTitle().should('eq', 'You have no items in your shopping cart.')
    });

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  })
})
