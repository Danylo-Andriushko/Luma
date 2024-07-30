import { BasePage } from "./base_page";

export class CartPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/cart/';
    }


    cartPageItem(){ return cy.get(`.cart.item`) };
    productImage(){ return cy.get(`.product-image-photo[data-bind]`) };
    productName(){ return cy.get(`.cart.item .product-item-details .product-item-name`) };
    productPrice(){ return cy.get(`.col.price .cart-price .price`) };
    cartQuantityInput(){ return cy.get(`input.input-text.qty`) };
    productSubtotal(){ return cy.get(`[data-th="Subtotal"] .cart-price`) };
    editButton(){ return cy.get(`.action.action-edit`) };
    deleteButton(){ return cy.get(`.action.action-delete`) }
    updateShoppingCartButton(){ return cy.get(`button.action.update`) };
    deleteProductButton(){ return cy.get(`.action.action-delete`)};
    cartTitle(){ return cy.get(`.cart-empty p`).first()};
    proceedToCheckoutButton(){ return cy.get(`button[data-role="proceed-to-checkout"]`) };

    productNameText(){
        return this.productName().invoke('text')
    }

    productQuantity() {
        return this.cartQuantityInput().invoke('attr', 'value').then((text) => Number(text));
    }

    deleteProductsFromCartPage(){
        this.wait(1);
        this.deleteButton().click({force: true});
        return this;
    }

    confirmCheckoutFromCartPage(){
        this.wait(1);
        this.proceedToCheckoutButton().click({force: true});
        return this;
    }

    emptyCartTitle(){
        this.wait(1);
        return this.cartTitle().invoke('text')
    }

    openShippingPage(){
        this.wait(3)
        this.proceedToCheckoutButton().click({force: true});
    }

    checkCartPageProductDetailsIsExist(){
        return [
        this.productImage().should('have.prop', 'tagName', 'IMG'),
        this.productName(),
        this.productPrice(),
        this.cartQuantityInput(),
        this.productSubtotal(),
        this.editButton(), 
        this.editButton()
        ]
    }
}