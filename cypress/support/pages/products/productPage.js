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

customizeProductOnTheCurrentPage(size, color, quantity) {
    return customizeProductOptions.customizeProduct(size, color, quantity);
}

checkIfProductIsAdded() { this.productTitle().then((title) => {
        return pageMessage.pageMessageText().should('include', `You added ${title} to your shopping cart.`);
    })
}
}