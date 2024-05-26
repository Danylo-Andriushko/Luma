import { MainContentMenu } from "./mainContentMenu";
const menuItems = new MainContentMenu();

export class Header{
    constructor(){
    }

    signInButton(){ return cy.xpath('//a[normalize-space(text())="Sign In"]').first() }
    createAnAccountLink() { 
        return cy.get(`a[href='https://magento.softwaretestingboard.com/customer/account/create/']`)
        .contains("Create an Account") 
    };

    signInButtonIsAvailableFromAllContentPages() {
        const menuButtons = [
            menuItems.whatsNew,
            menuItems.womenButton,
            menuItems.menButton,
            menuItems.gearButton,
            menuItems.trainingButton,
            menuItems.saleButton
        ];

        menuButtons.forEach(button => {
            button().click({multiple: true});
            this.signInButton().should('be.visible');
        });
    }

}