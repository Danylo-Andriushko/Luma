import { BasePage } from "./base_page";
import { faker } from "@faker-js/faker";
const { registrationsAttributesValues } = require("../../fixtures/customer_account_data");
import { checkAttributesFields, checkRequiredAttributesFields } from '../../fixtures/checkAttributes';


export class CreateNewAccountPage extends BasePage{
    constructor(){
        super();
        this.url = '/customer/account/create/';
    }

    fieldsAttributes (field) { return cy.get(`.field.required > .label[for="${field}"]`) };
    firstNameField () { return cy.get(`#firstname`) };
    lastNameField () { return cy.get(`#lastname`) };
    emailField () { return cy.get(`#email_address`) };
    passwordField () { return cy.get(`#password`) };
    confirmPasswordField () { return cy.get(`#password-confirmation`) };
    createAnAccountButton () { return cy.get(`.action.submit.primary[title='Create an Account']`) };

    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomEmail = faker.internet.email();
    randomPassword = faker.internet.password();

    checkRegistrationAttributesFields() {
        checkAttributesFields(registrationsAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkRegistrationRequiredAttributesFields() {
        checkRequiredAttributesFields(registrationsAttributesValues, this.fieldsAttributes.bind(this));
    }

    inputRegistrationData(){
        this.firstNameField().type(this.randomFirstName);
        this.lastNameField().type(this.randomLastName);
        this.emailField().type(this.randomEmail);
        this.passwordField().type(this.randomPassword);
        this.confirmPasswordField().type(this.randomPassword);
        this.createAnAccountButton().click({multiple: true})
    }

}