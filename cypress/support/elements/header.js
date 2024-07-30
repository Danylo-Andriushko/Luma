import { BasePage } from "../pages/base_page";
import { MainContentMenu } from "./mainContentMenu";
const menuItems = new MainContentMenu();

export class Header extends BasePage{
    constructor(){
        super();
    }

    signInButton(){ return cy.xpath('//a[normalize-space(text())="Sign In"]').first() }
    createAnAccountLink() { 
        return cy.get(`a[href='https://magento.softwaretestingboard.com/customer/account/create/']`)
        .contains("Create an Account") 
    };
    signOutLink() { 
        return cy.get(`a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]`)
        .contains("Sign Out") 
    };
    userMenu(){ return cy.get(`.page-wrapper > header > div.panel button`) };

    searchInput(){ return cy.get(`input#search`) };
    searchButton(){ return cy.get(`button.action.search`) };

    inputSearchValue(value){
        this.searchInput().type(value);
    }

    clickSearchButton(){
        this.searchButton().click();
        this.wait(1);
    }

    searchProduct(value){
        this.inputSearchValue(value);
        this.clickSearchButton();
    }

    checkIfAvailableFromAllContentPages(item) {
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
            item === 'signInButton' ? this.signInButton().should('be.visible') :
            item === 'createAnAccountLink' ? this.createAnAccountLink().should('be.visible') :
            item === 'searchInput' ? this.searchInput().should('be.visible') : null;
        });
    }
}