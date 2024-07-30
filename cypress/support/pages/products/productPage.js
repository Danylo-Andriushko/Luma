import { ProductUtils } from "../../../utils/product_manager";
import { PageMessage } from "../../elements/messages";
import { BasePage } from "../base_page";
const pageMessage = new PageMessage();
const customizeProductOptions = new ProductUtils();

export class ProductPage extends BasePage{
    constructor(){
        super();
    }

productTitle(){
    return cy.get(`span[data-ui-id="page-title-wrapper"]`).invoke('text')
}

sizeOption(){
    return cy.get(`.swatch-option.text.selected`)
}

colorOption(){
    return cy.get(`.swatch-option.color.selected`)
}

customizeProductOnTheCurrentPage(size, color, quantity) {
    return customizeProductOptions.customizeProduct(size, color, quantity);
}

addButton() {
    return cy.get(`button[id="product-addtocart-button"]`);
}

checkIfProductIsAdded() { 
        this.productTitle().then((title) => {
        return pageMessage.pageMessageText().should('include', `You added ${title} to your shopping cart.`);
    })
}

checkIfOptionsIs(value) {
    this.sizeOption().should('have.class', value);
    this.colorOption().should('have.class', value);
}

}