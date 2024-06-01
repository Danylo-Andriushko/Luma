import { BasePage } from "./base_page";
import { loginAttributesValues } from "../../fixtures/customer_account_data";
import { checkAttributesFields, checkRequiredAttributesFields } from '../../fixtures/checkAttributes';

export class LoginPage extends BasePage{
    constructor(){
        super();
        this.url = '/customer/account/login';
    }
    
    fieldsAttributes (field) { return cy.get(`.field.required > .label[for="${field}"]`) };
    emailField(){ return cy.get('input[id="email"]') };
    passwordField(){ return cy.get('input[id="pass"]') };
    signInButton(){ return cy.get('button.action.login.primary') }

    checkLoginAttributesFields() {
        checkAttributesFields(loginAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkLoginRequiredAttributesFields() {
        checkRequiredAttributesFields(loginAttributesValues, this.fieldsAttributes.bind(this));
    }

    signIn(email, password){
        this.emailField().type(email)
        this.passwordField().type(password)
        this.signInButton().click({multiple:true})
        return this
    }
}