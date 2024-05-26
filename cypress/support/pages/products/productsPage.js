import { BasePage } from "../base_page";

export class ProductsPage extends BasePage{
    constructor(){
        super();
        this.url = '/women/tops-women/jackets-women.html';
    }
productItem(numeral){ 
    return cy.get(`.item.product.product-item`).eq(numeral)
}

selectProduct(item){
    this.productItem(item).click({ multiple: true })
}

}