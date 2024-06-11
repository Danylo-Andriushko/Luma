import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
import { urls } from "../utils/pages_url.js";
import { changeProductQuantityTo, productsSubtotal } from "../utils/shopping_cart.js"
import { ProductUtils } from '../utils/product_helpers.js';
const productHelpers = new ProductUtils();

const cart = new Cart();
const mainPage = Pages.main_page;
const cartPage = Pages.cart_page;

describe('Edit cart', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  describe('Edit mini cart', () => {
  it('Should recalculate subtotal in the Mini Cart', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1)
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

  it('User is able delete product from Mini Cart', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1)
    cart.clickCartIcon();
    cart.deleteProducts();
    cart.miniCartEmptyPopup().should('eq', 'You have no items in your shopping cart.')
  });
});

describe('Edit Cart page', () => {
  it('Should recalculate subtotal in the Cart page', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1)
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

  it('User is able delete product from Cart page', () => {
    productHelpers.addProductToTheCart("S", "Blue", 1)
    cy.visit(urls.cartPage)
    cartPage.deleteProductsFromCartPage();
    cartPage.emptyCartTitle().should('eq', 'You have no items in your shopping cart.')
  });

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  });
});
})
