import { BasePage } from "../pages/base_page";

export class Message extends BasePage{
    constructor(){
        super();
    }

    message(){
        return cy.get(`[data-bind="html: $parent.prepareMessageForHtml(message.text)"]`).invoke('text');
    }
}