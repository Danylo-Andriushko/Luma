import { BasePage } from "./base_page";

export class AccountPage extends BasePage{
    constructor(){
        super();
        this.url = '/customer/account/';
    }

}