import { BasePage } from "./base_page";
import { faker } from "@faker-js/faker";
import { checkAttributesFields, checkRequiredAttributesFields } from '../../utils/check_attributes';
import attributesData from "../../fixtures/attributes_data.json";

export class CheckoutPage extends BasePage{
    constructor(){
        super();
        this.url = '/checkout/cart/';
    }

    fieldsAttributes (field) { return cy.get(`[name="${field}"] .label`) };
    emailField(){ return cy.get(`#shipping #customer-email`) };
    firstNameField(){ return cy.get(`[name="firstname"]`) };
    lastNameField(){ return cy.get(`[name="lastname"]`) };
    companyField(){ return cy.get(`[name="company"]`) };
    streetAddressField(){ return cy.get(`[name="street[0]"]`) };
    cityField(){ return cy.get(`[name="city"]`) };
    stateField(){ return cy.get(`[name="region"]`) };
    postalCodeField(){ return cy.get(`[name="postcode"]`) };
    countryField(){ return cy.get(`[name="shippingAddress.country_id"] > div > select`) };
    phoneNumberField(){ return cy.get(`[name="telephone"]`) };
    nextButton(){ return cy.get(`.primary.button.action.continue.primary`) };

    randomEmail = faker.internet.email()
    randomFirstName = faker.person.firstName()
    randomLastName = faker.person.lastName()
    randomCompany = faker.company.name()
    randomStreetAddress = faker.location.street()
    randomCity = faker.location.city()
    randomCountry = 'Ukraine'
    randomState = 'Lvivska obl.'
    randomPostalCode = faker.location.zipCode()
    randomPhone = faker.phone.number()
    
    inputCheckoutData(){
        this.emailField().type(this.randomEmail);
        this.firstNameField().type(this.randomFirstName);
        this.lastNameField().type(this.randomLastName);
        this.companyField().type(this.randomCompany);
        this.streetAddressField().type(this.randomStreetAddress);
        this.countryField().select(this.randomCountry);
        this.cityField().type(this.randomCity);
        this.stateField().type(this.randomState);
        this.postalCodeField().type(this.randomPostalCode);
        this.phoneNumberField().type(this.randomPhone);
        this.wait(3);
        this.nextButton().click({force: true});
    }

    checkCheckoutAttributesFields() {
        checkAttributesFields(attributesData.checkoutAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkCheckoutRequiredAttributesFields() {
        checkRequiredAttributesFields(attributesData.checkoutRequiredAttributesValue, this.fieldsAttributes.bind(this));
    }
}