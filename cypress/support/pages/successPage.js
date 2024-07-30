import { BasePage } from "./base_page";

export class SuccessPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/onepage/success/';
    }

    pageTitle(){ return cy.get(`span[data-ui-id="page-title-wrapper"]`) };
    continueShoppingButton(){ return cy.get(`a.action.primary.continue`) };
    
    confirmationMessage(){
        return this.pageTitle().invoke('text')
    }

}