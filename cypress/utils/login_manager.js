import { Header } from "../support/elements/header";
import Pages from '../support/pages/pagesFactory';

const header = new Header();
const mainPage = Pages.main_page;
const homePage = Pages.home_page;
const loginPage = Pages.login_page;
const myAccountPage = Pages.account_page;


export const loginToTheApplication = (email, password) => {
    mainPage.open();
    header.signInButton().click({force: true});
    loginPage.signIn(email, password);
    homePage.checkPageUrl();
}

export const signOut = () => {
    cy.wait(1000);
    header.userMenu().click({force: true});
    header.signOutLink().click({force: true});
    return this
}

export const checkIfUserIsAbleToSignIn = (email, password) => {
    header.signInButton()
        .should('be.visible')
        .click({force: true})
    loginPage.signIn(email, password)    
    myAccountPage.checkPageUrl()
    return this;
}
    