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

    checkoutData = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.person.firstName(),
    randomLastName: faker.person.lastName(),
    randomCompany: faker.company.name(),
    randomStreetAddress: faker.location.street(),
    randomCity: faker.location.city(),
    randomCountry: 'Ukraine',
    randomState: 'Lvivska obl.',
    randomPostalCode:faker.location.zipCode(),
    randomPhone: faker.phone.number()
    };
    
    inputCheckoutData(email, firstName, lastName, company, street, country, city, state, zipCode, phone){
        this.emailField().type(email);
        this.firstNameField().type(firstName);
        this.lastNameField().type(lastName);
        this.companyField().type(company);
        this.streetAddressField().type(street);
        this.countryField().select(country);
        this.cityField().type(city);
        this.stateField().type(state);
        this.postalCodeField().type(zipCode);
        this.phoneNumberField().type(phone);
        this.wait(3);
    }

    clickNextButton(){
        this.nextButton().click({force: true});
    }

    checkCheckoutAttributesFields() {
        checkAttributesFields(attributesData.checkoutAttributesValues, this.fieldsAttributes.bind(this));
    }

    checkCheckoutRequiredAttributesFields() {
        checkRequiredAttributesFields(attributesData.checkoutRequiredAttributesValue, this.fieldsAttributes.bind(this));
    }
}