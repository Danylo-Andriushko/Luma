import { BasePage } from "../support/pages/base_page";

export class CustomizeProduct extends BasePage{
constructor(){
  super();
}

sizeMenu(size) {
    return cy.get(`.swatch-option.text[aria-label=${size}]`);
}

productColor(color) {
    return cy.get(`[aria-label=${color}]`);
}

productQuantity() {
    return cy.get(`input[id="qty"]`);
}

addButton() {
    return cy.get(`button[id="product-addtocart-button"]`);
}

customizeProduct(size, color, quantity) {
        this.wait(1),
        this.sizeMenu(size).click(),
        this.productColor(color).click({ force: true }),
        this.productQuantity().clear().type(quantity),
        this.addButton().click({ multiple: true })
}
}