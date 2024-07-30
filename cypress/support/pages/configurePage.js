import { BasePage } from "./base_page";

export class ConfigurePage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/cart/configure';
    }

    updateCartButton(){ return cy.get(`#product-updatecart-button`) };
    

    clickConfirmUpdateButton(){
        return this.updateCartButton().click({force: true})
    }
}