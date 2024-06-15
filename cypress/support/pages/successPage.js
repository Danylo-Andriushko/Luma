import { BasePage } from "./base_page";

export class SuccessPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/onepage/success/';
    }

    pageTitle(){ return cy.get(`span[data-ui-id="page-title-wrapper"]`) };
    continueShoppingButton(){ return cy.get(`a.action.primary.continue`) };
    
    checkIfOrderIsSuccessfull(){
        this.pageTitle().invoke('text').should('eql', 'Thank you for your purchase!')
        this.continueShoppingButton().should('be.visible');
    }

}