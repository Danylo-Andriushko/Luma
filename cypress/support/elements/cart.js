import { BasePage } from "../pages/base_page"

export class Cart extends BasePage{
    constructor(){
        super();
    }
    miniCart(){ return cy.get(`[data-block="minicart"] .action.showcart`)};
    miniCartIconCounter(){ return cy.get(`[data-block="minicart"] .counter .counter-number`)};
    miniCartTitleCounter(){ return cy.get(`span.count`) };
    
    productSubtotal(){ return cy.get(`.subtotal span.price`)};
    proceedToCheckoutButton(){ return cy.get(`button.action.primary.checkout`) };
    productName(){ return cy.get(`div strong.product-item-name a[data-bind]`) };
    detailsMenu(){ return cy.get('span.toggle')};
    productSize(){ return cy.get('[data-bind="text: option.value"]').first()};
    productColor(){ return cy.get('[data-bind="text: option.value"]').last()};
    productPrice(){ return cy.get('.minicart-price .price')};
    miniCartQuantityInput(){ return cy.get(`input.item-qty.cart-item-qty`) };
    deleteButton(){ return cy.get(`.action.delete`)};
    editButton(){ return cy.get(`.action.edit`) };
    viewCartPageLink(){ return cy.get('.action.viewcart')};
    updateProductQuantityButton(){ return cy.get(`button.update-cart-item`)};
    confirmDeletionButton(){ return cy.get(`.action-primary.action-accept`)};
    cancelDeletionButton(){ return cy.get(`.action-secondary.action-dismiss`)};
    miniCartPopup(){ return cy.get(`.subtitle.empty`)};
    

    isCartIconProductQuantityEqualTo(number){
        return this.miniCartIconCounter().invoke('text').then(function(cartNumber){
            expect(Number(cartNumber)).to.eq(number)
        })
    }

    clickCartIcon(){
        this.loadingSpinner().should('not.exist');
        this.miniCart().click({force: true});
        this.wait(1);
        return this
    }

    cartQuantity() {
        return this.miniCartTitleCounter().invoke('text').then((text) => Number(text));
    }

    deleteProducts(action){
        this.deleteButton().click({force: true});
        action === 'delete' ? this.confirmDeletionButton().click({force: true}) : 
        action === 'cancel' ? this.cancelDeletionButton().click({force: true}) : null;
        return this;
    }

    miniCartEmptyPopup(){
        return this.miniCartPopup().invoke('text')
    }

    confirmCheckoutFromMiniCart(){
        this.proceedToCheckoutButton().click({force: true});
        return this;
    }

    checkMiniCartProductDetailsIsExist(){
        return [
        this.miniCartTitleCounter(),
        this.productSubtotal(),
        this.proceedToCheckoutButton(),
        this.productName(),
        this.detailsMenu(),
        this.productSize(),
        this.productColor(),
        this.productPrice(),
        this.miniCartQuantityInput(),
        this.editButton(),
        this.deleteButton(),
        this.viewCartPageLink()
        ]
    }
}