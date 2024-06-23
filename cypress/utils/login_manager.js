import { Header } from "../support/elements/header";
import Pages from '../support/pages/pagesFactory';

const header = new Header();
const mainPage = Pages.main_page;
const loginPage = Pages.login_page;

export const loginToTheApplication = (email, password) => {
    mainPage.open();
    header.signInButton().click({force: true});
    loginPage.signIn(email, password);
}

export const signOut = () => {
    cy.wait(1000);
    header.userMenu().click({force: true});
    header.signOutLink().click({force: true});
    return this
}
    