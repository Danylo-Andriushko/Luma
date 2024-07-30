import { Cart } from '../support/elements/cart.js';
import Pages from '../support/pages/pagesFactory.js';
import { changeProductQuantityTo, productsSubtotal } from "../utils/shopping_cart_manager.js"
import { ProductUtils } from '../utils/product_manager.js';
import { PageMessage } from '../support/elements/messages.js';
const productActions = new ProductUtils();

const cart = new Cart();
const pageMessage = new PageMessage();
const mainPage = Pages.main_page;
const cartPage = Pages.cart_page;
const shippingPage = Pages.shipping_page;
const configurePage = Pages.configure_page;

describe('Edit cart feature', () => {
  beforeEach(() => {
    mainPage.open();
    productActions.addProductToTheCart("S", "Blue", 1, 1);
  })

  describe('Mini Cart', () => {
    beforeEach(() => {
      cart.clickCartIcon();
    })

    it('The products with their details should exist in the mini cart', () => {
      cart.checkMiniCartProductDetailsIsExist().forEach(productDetails => {
          productDetails.should('be.exist');
        });
    });

  it('User should be able to recalculate subtotal in the Mini Cart', () => {
    productsSubtotal(cart.productPrice()).then((initialPrice) => {
      changeProductQuantityTo(5, cart.miniCartQuantityInput(), 
      cart.updateProductQuantityButton());
      cart.cartQuantity().should('eq', 5);
      productsSubtotal(cart.productSubtotal()).then((changedSum) => {
        cart.cartQuantity().then((cartNum) => {
          expect(changedSum).to.eq(initialPrice * cartNum);
        });
      });
    });
  });

it('User should be able to delete product from the Mini Cart', () => {
    cart.deleteProducts('delete');
    cart.miniCartEmptyPopup().should('eq', 'You have no items in your shopping cart.')
  });

it('User should be able to cancel deletion product from the Mini Cart', () => {
    cart.deleteProducts('cancel');
    cart.isCartIconProductQuantityEqualTo(1);
  });

  it('User should be able to configure product options from the Mini Cart', () => {
    cart.editButton().click();
    productActions.customizeProduct("M", "Green", 2);
    configurePage.clickConfirmUpdateButton();
    cartPage.productNameText().then((productName) => {
      return pageMessage.pageMessageText().should('eq', `${productName.trim()} was updated in your shopping cart.`);
    });
  });

  it('User should be able to proceed to checkout from the Mini Cart', () => {
    cart.confirmCheckoutFromMiniCart();
    shippingPage.checkPageUrl();
  });

});

describe('Cart page', () => {
  beforeEach(() => {
    cartPage.open();
  })

  it('The products with their details should be exist in the Cart page', () => {
    cartPage.checkCartPageProductDetailsIsExist().forEach(productDetails => {
        productDetails.should('be.exist');
      });
  });

  it('User should be able to recalculate subtotal in the Cart page', () => {
    productsSubtotal(cartPage.productPrice()).then((initialPrice) => {
    changeProductQuantityTo(5, cartPage.cartQuantityInput(), cartPage.updateShoppingCartButton());
    cartPage.productQuantity().should('eq', 5);
    productsSubtotal(cartPage.productSubtotal()).then((changedSum) => {
      cartPage.productQuantity().then((cartNum) => {
        expect(changedSum).to.eq(initialPrice * cartNum);
      });
    });
  });
  });

  it('User should be able to delete all products from the Cart page', () => {
    cartPage.deleteProductsFromCartPage();
    cartPage.emptyCartTitle().should('eq', 'You have no items in your shopping cart.');
  });

  it('User should be able to delete 1 product from the list of products in the Cart page', () => {
    productActions.addMoreThanOneProductToTheCart("S", "Blue", 1, 1, 2);
    cartPage.open();
    cartPage.cartPageItem().its('length').then((initialLength) => {
      cartPage.deleteButton().first().click({force: true});
      cartPage.cartPageItem().should('have.length', parseInt(initialLength));
  });
  });

  it('User should be able to configure product options from the Cart Page', () => {
    cartPage.editButton().click();
    productActions.customizeProduct("M", "Green", 2);
    configurePage.clickConfirmUpdateButton();
    cartPage.productNameText().then((productName) => {
      return pageMessage.pageMessageText().should('include', `${productName.trim()} was updated in your shopping cart.`);
    });
  });

  it('User should be able to proceed to checkout from the Cart Page', () => {
    cartPage.confirmCheckoutFromCartPage();
    shippingPage.checkPageUrl();
  });

  afterEach('clear cookies value', () => {
    cy.clearCookies();
  });
});
})
