export const changeProductQuantityTo = (quantity, input, updateButton) => {
    input.clear().type(quantity);
    updateButton.click({force: true});
    cy.wait(2000);
    return this
}

export const productsSubtotal = (price) => {
    return price.invoke('text').then((text) => {
        const numericText = text.replace(/[^\d.-]/g, '')
        return Number(numericText);
    });
}