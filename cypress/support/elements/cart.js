import { BasePage } from "../pages/base_page"

export class Cart extends BasePage{
    constructor(){
        super();
    }
    miniCart(){ return cy.get(`[data-block="minicart"] .action.showcart`)};
    miniCartIconCounter(){ return cy.get(`[data-block="minicart"] .counter .counter-number`)};
    miniCartQuantityInput(){ return cy.get(`input.item-qty.cart-item-qty`) };
    miniCartTitleCounter(){ return cy.get(`span.count`) };
    updateProductQuantityButton(){ return cy.get(`button.update-cart-item`)};
    deleteProductButton(){ return cy.get(`.action.delete`)};
    confirmDeletionButton(){ return cy.get(`.action-primary.action-accept`)};
    productPrice(){ return cy.get(`.subtotal span.price`)};
    getMiniCartEmptyPopup(){ return cy.get(`.subtitle.empty`)};

    cartIconNumberIs(number){
        return this.miniCartIconCounter().invoke('text').then(function(cartNumber){
            expect(Number(cartNumber)).to.eq(number)
        })
    }

    clickCartIcon(){
        this.wait(2)
        return this.miniCart().click({force: true})
    }

    cartQuantity() {
        return this.miniCartTitleCounter().invoke('text').then((text) => Number(text));
    }

    deleteProducts(){
        this.deleteProductButton().click({force: true});
        this.confirmDeletionButton().click({force: true});
        return this;
    }

    miniCartEmptyPopup(){
        return this.getMiniCartEmptyPopup().invoke('text')
    }
}