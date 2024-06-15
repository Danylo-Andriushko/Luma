import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
import { changeProductQuantityTo, productsSubtotal } from "../utils/shopping_cart_helpers.js"
import { ProductUtils } from '../utils/product_helpers.js';
const productActions = new ProductUtils();

const cart = new Cart();
const mainPage = Pages.main_page;
const cartPage = Pages.cart_page;

describe('Edit cart feature', () => {
  beforeEach('open main page', () => {
    mainPage.open();
  })

  describe('Mini Cart', () => {
  it('User should be able recalculate subtotal in the Mini Cart', () => {
    productActions.addProductToTheCart("S", "Blue", 1)
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

  it('User should be able to delete product from Mini Cart', () => {
    productActions.addProductToTheCart("S", "Blue", 1)
    cart.clickCartIcon();
    cart.deleteProducts();
    cart.miniCartEmptyPopup().should('eq', 'You have no items in your shopping cart.')
  });
});

describe('Cart page', () => {
  it('User should be able to recalculate subtotal in the Cart page', () => {
    productActions.addProductToTheCart("S", "Blue", 1)
    cartPage.open();
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

  it('User should be able to delete product from Cart page', () => {
    productActions.addProductToTheCart("S", "Blue", 1)
    cartPage.open();
    cartPage.deleteProductsFromCartPage();
    cartPage.emptyCartTitle().should('eq', 'You have no items in your shopping cart.')
  });

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  });
});
})
