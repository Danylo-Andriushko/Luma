import { BasePage } from "./base_page";
import { checkAttributesFields, checkRequiredAttributesFields } from '../../utils/check_attributes';
import attributesData from "../../fixtures/attributes_data.json";

export class LoginPage extends BasePage{
    constructor(){
        super();
        this.url = '/customer/account/login';
    }
    
    fieldsAttributes (field) { return cy.get(`.field.required > .label[for="${field}"]`) };
    emailField(){ return cy.get('input[id="email"]') };
    passwordField(){ return cy.get('input[name="login[password]"]') };
    signInButton(){ return cy.get('button.action.login.primary') };
    emailErrorMessage(){ return cy.get('[id="email-error"]') }

    checkLoginAttributesFields() {
        checkAttributesFields(attributesData.loginAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkLoginRequiredAttributesFields() {
        checkRequiredAttributesFields(attributesData.loginAttributesValues, this.fieldsAttributes.bind(this));
    }

    signIn(email, password){
        this.emailField().type(email)
        this.passwordField().type(password)
        this.signInButton().click({multiple:true})
        return this
    }

    emailErrorMessageText(){
        return this.emailErrorMessage().invoke('text')
    }
}