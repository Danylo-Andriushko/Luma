import { BasePage } from "./base_page";

export class PaymentPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/#payment';
    }

    placeOrderButton(){ return cy.get(`button.action.primary.checkout`) };
    billingAddressBlock(){ return cy.get(`.payment-method-billing-address`) };
    orderSummaryBlock(){ return cy.get(`.opc-block-summary`) };
    shippingAddressBlock(){ return cy.get(`.shipping-information`) };
    shippingMethodBlock(){ return cy.get(`.ship-via`) };
    discountMenu(){ return cy.get(`.action.action-toggle`) };
    discountInput(){ return cy.get(`input#discount-code`) };
    discountConfirmationButton(){ return cy.get(`button.action.action-apply`) };
    couponMessage(){ return cy.get(`div [data-ui-id="checkout-cart-validationmessages-message-error"]`) }

    confirmOrder(){
        return this.placeOrderButton().click({force: true})
    }

    paymentInformation(){
        return [
            this.billingAddressBlock(),
            this.orderSummaryBlock(),
            this.shippingAddressBlock(),
            this.shippingMethodBlock()
        ];
    }

    inputDiscount(discountCode){
        this.discountMenu().click({force: true})
        this.discountInput().clear().type(discountCode)
        this.discountConfirmationButton().click({force: true})
        return this
    }

    couponErrorMessage(){
        return this.couponMessage().invoke('text')
    }
    
}