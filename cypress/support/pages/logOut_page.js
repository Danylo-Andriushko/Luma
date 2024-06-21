    import { BasePage } from "./base_page";


    export class LogoutPage extends BasePage{
        constructor(){
            super();
            this.url = '/customer/account/logoutSuccess/';
        }
        logOutTitle() {
            return cy.get('h1.page-title');
        }

        logOutMessage() {
            return cy.get('div .column.main p');
        }
    
        successLogoutMessage() {
            return this.logOutTitle().invoke('text').then((titleText) => {
                return this.logOutMessage().invoke('text').then((messageText) => {
                    const combinedText = `${titleText} ${messageText}`.replace(/\s+/g, ' ').trim();
                    return combinedText;
                });
            });
        }
    
        checkPageWithSuccessMessage(message) {
            this.successLogoutMessage().then((text) => {
                expect(text).to.eql(message);
            });
        }

        waitFiveSeconds(){
            return this.wait(5);
        }
    }