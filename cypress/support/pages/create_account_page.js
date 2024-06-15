import { BasePage } from "./base_page";
import { faker } from "@faker-js/faker";
import { checkAttributesFields, checkRequiredAttributesFields } from '../../utils/check_attributes';
import { PageMessage } from "../elements/messages";
import attributesData from "../../fixtures/attributes_data.json";
const pageMessage = new PageMessage();


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

    registrationData = {
    randomFirstName: faker.person.firstName(),
    randomLastName: faker.person.lastName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password(),
    };

    checkRegistrationAttributesFields() {
        checkAttributesFields(attributesData.registrationsAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkRegistrationRequiredAttributesFields() {
        checkRequiredAttributesFields(attributesData.registrationsAttributesValues, this.fieldsAttributes.bind(this));
    }

    inputRegistrationData(firstName, lastName, email, password){
        this.firstNameField().type(firstName);
        this.lastNameField().type(lastName);
        this.emailField().type(email);
        this.passwordField().type(password);
        this.confirmPasswordField().type(password);  
    }

    clickCreateAnAccountButton(){
        this.createAnAccountButton().click({multiple: true})
    }

    checkIfRegistrationMessageIsSuccessful(){
        return pageMessage.pageMessageText().should('eq', 'Thank you for registering with Main Website Store.')
    }
}