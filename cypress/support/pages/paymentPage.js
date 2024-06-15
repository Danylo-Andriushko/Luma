import { BasePage } from "./base_page";

export class PaymentPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/#payment';
    }

    placeOrderButton(){ return cy.get(`button.action.primary.checkout`) };

    confirmOrder(){
        return this.placeOrderButton().click({force: true})
    }
    
}