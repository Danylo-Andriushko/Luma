import { BasePage } from "./base_page";

export class CartPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/cart/';
    }

    cartQuantityInput(){ return cy.get(`input.input-text.qty`) };
    updateShoppingCartButton(){ return cy.get(`button.action.update`) };
    productPrice(){ return cy.get(`span.price-wrapper[data-bind="html: cart().subtotal_excl_tax"]`)};
    deleteProductButton(){ return cy.get(`.action.action-delete`)};
    cartTitle(){ return cy.get(`.cart-empty p`).first()};
    proceedToCheckoutButton(){ return cy.get(`button[data-role="proceed-to-checkout"]`) }

    productQuantity() {
        return this.cartQuantityInput().invoke('attr', 'value').then((text) => Number(text));
    }

    deleteProductsFromCartPage(){
        this.deleteProductButton().click({force: true});
        return this;
    }

    emptyCartTitle(){
        return this.cartTitle().invoke('text')
    }

    openCheckoutPage(){
        cy.wait(3000)
        this.proceedToCheckoutButton().click({force: true});
        cy.url().should('include', '/checkout/#shipping')
        return this;
    }
}