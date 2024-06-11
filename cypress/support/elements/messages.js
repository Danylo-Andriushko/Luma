import { BasePage } from "../pages/base_page";

export class PageMessage extends BasePage{
    constructor(){
        super();
    }

    pageMessageText(){
        return cy.get(`[data-bind="html: $parent.prepareMessageForHtml(message.text)"]`).invoke('text');
    }
}