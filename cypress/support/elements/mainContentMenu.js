export class MainContentMenu{
    constructor(){
    }

    whatsNew(){ return cy.xpath(`//span[text()="What's New"]`) }
    womenButton(){ return cy.xpath(`//span[text()="Women"]`) }
    womenTopsButton(){ return cy.xpath(`//*[@id="ui-id-9"]/span[text()="Tops"]`) }
    womenJacketsButton(){ return cy.xpath(`//*[@id="ui-id-11"]/span[text()="Jackets"]`) }
    menButton(){ return cy.xpath(`//span[text()="Men"]`) }
    gearButton(){ return cy.xpath(`//span[text()="Gear"]`) }
    trainingButton(){ return cy.xpath(`//span[text()="Training"]`) }
    saleButton(){ return cy.xpath(`//span[text()="Sale"]`) }
}