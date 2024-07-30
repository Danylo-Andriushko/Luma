import { BasePage } from "./base_page";

export class SearchResultPage extends BasePage{
    constructor(){
        super();
    }

    productItemsName(){ return cy.get(`dd.item a`) };
    autocompleteOptionName(){ return cy.get(`.qs-option-name`) };
    searchMessage(){ return cy.get(`.message.notice div`) };
    sortMenu(){ return cy.get(`select#sorter`).first() };
    directionSwitcher(){ return cy.get(`[data-role="direction-switcher"]`).first() };
    productPrice(){ return cy.get(`[data-price-type="finalPrice"] span`) };
    productName(){ return cy.get(`.product.name.product-item-name`) };

    checkContains(selector, value) {
        const expectedValue = value.toLowerCase();
        selector.invoke('text').then((text) => {
            const currentValue = text.toLowerCase().trim();
            expect(currentValue).to.include(expectedValue);
        });
    }

    isProductSearchContains(value) {
        this.checkContains(this.productItemsName(), value);
    }

    isSearchAutocompleteContains(value) {
        this.checkContains(this.autocompleteOptionName(), value);
    }
    
    searchMessageValue(){
        return this.searchMessage().invoke('text')
    }

    selectSortOption(option){
        this.sortMenu().select(option);
        this.wait(1);
    }

    setDirection(expectedDirection) {
        this.directionSwitcher().invoke('attr', 'title')
            .then((direction) => {
                direction === expectedDirection ? this.directionSwitcher().click(): null
            });
            this.wait(2);
    }

    checkIfPriceOrderIs(order) {
        this.productPrice().invoke('text').then((text) => {
            let numbers = text.match(/\d+(\.\d{1,2})?/g).map(Number);
            let isSorted = numbers.every((val, i, arr) => 
                !i || (order === 'ascending' ? val >= arr[i - 1] : val <= arr[i - 1])
            );
            expect(isSorted).to.be.true;
        });
    }

    checkIfNameOrderIs(order) {
        return this.productName().invoke('text').then((text) => {
            const names = text.split('\n').map(name => name.trim()).filter(name => name !== '');
            let sortedArr;
            if(order === 'ascending'){
                sortedArr = [...names].sort((a, b) => a.localeCompare(b));
            } else if(order === 'descending'){
                sortedArr = [...names].sort((a, b) => b.localeCompare(a));
            }
            expect(names).to.deep.equal(sortedArr);
        });
    }
}