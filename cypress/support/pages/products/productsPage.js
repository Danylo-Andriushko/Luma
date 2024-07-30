import { BasePage } from "../base_page";

export class ProductsPage extends BasePage{
    constructor(){
        super();
        this.url = '/women/tops-women/jackets-women.html';
    }
productItems(){ 
    return cy.get(`.product-item-info`)
}

productItemsImage(){
    return cy.get(`.product-image-photo`)
}

productItemsName(){
    return cy.get(`.product-item-link`)
}

productItemsPrice(){
    return cy.get(`span[data-price-amount]`)
}

productItemsSize(){
    return cy.get(`.swatch-attribute.size`)
}

productItemsColor(){
    return cy.get(`.swatch-attribute.color`)
}

productItem(numeral){ 
    return cy.get(`.item.product.product-item`).eq(numeral)
}

selectProduct(item){
    this.productItem(item).click({ multiple: true })
}

}