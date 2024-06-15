import { Cart } from "../support/elements/cart";
import { BasePage } from "../support/pages/base_page";
import { MainPage } from "../support/pages/main_page";
import { ProductsPage } from "../support/pages/products/productsPage";

const cart = new Cart();
const mainPage = new MainPage();
const productsPage = new ProductsPage();

export class ProductUtils extends BasePage{
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
    this.sizeMenu(size).click({ force: true }),
    this.productColor(color).click({ force: true }),
    this.productQuantity().clear().type(quantity),
    this.addButton().click({ multiple: true })
}


addProductToTheCart(size, color, quantity){
    mainPage.selectProductsGroup();
    productsPage.selectProduct(quantity);
    this.customizeProduct(size, color, quantity);
    return this
}

openCartPage(){
    cart.miniCart().click({force: true});
    cart.viewCartPageLink().click({force: true})
    return this
}

}