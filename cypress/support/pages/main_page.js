import { MainContentMenu } from "../elements/mainContentMenu";
import { BasePage } from "./base_page";

const menuItems = new MainContentMenu();

export class MainPage extends BasePage{
    constructor(){
        super();
        this.url = '/';
    }

    selectProductsGroup() {
            this.wait(1),
            menuItems.womenButton().trigger('mouseover'),
            menuItems.womenTopsButton().trigger('mouseover'),
            menuItems.womenJacketsButton().click({ multiple: true })
    }
}