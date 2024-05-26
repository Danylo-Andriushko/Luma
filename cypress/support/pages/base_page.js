export class BasePage{
    constructor(){
        this.url = '/';
    }

    open(){
        return cy.visit(this.url)
    };

    checkPageUrl(){
        cy.url().should('eq', `${Cypress.config('baseUrl')}${this.url}`);
        return this;
    }

    wait(ms) {
        return cy.wait(ms*1000);
    };
}