import { CustomizeProduct } from "../../../fixtures/customize_Product";
import { Message } from "../../elements/messages";
import { BasePage } from "../base_page";
const confirmationMessage = new Message();
const customizeProductOptions = new CustomizeProduct();

export class ProductPage extends BasePage{
    constructor(){
        super();
    }

productTitle(){
    return cy.get(`span[data-ui-id="page-title-wrapper"]`).invoke('text')
}

customizeProductOnTheCurrentPage(size, color, quantity) {
    return customizeProductOptions.customizeProduct(size, color, quantity);
}

productIsAdded() { this.productTitle().then((title) => {
        return confirmationMessage.message().should('include', `You added ${title} to your shopping cart.`);
    })
}
}