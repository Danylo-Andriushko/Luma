export class Cart{
    constructor(){
    }
    miniCart(){ return cy.get(`[data-block="minicart"] .counter .counter-number`)};

    cartNumberIs(number){
        return this.miniCart().invoke('text').then(function(cartNumber){
            expect(Number(cartNumber)).to.eq(number)
        })
    }
}