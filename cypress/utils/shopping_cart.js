export const changeProductQuantityTo = (quantity, input, updateButton) => {
    input.clear({force: true}).type(quantity);
    updateButton.click({force: true});
    cy.wait(3000);
    return this
}

export const productsSubtotal = (price) => {
    return price.invoke('text').then((text) => {
        const numericText = text.replace(/[^\d.-]/g, '')
        return Number(numericText);
    });
}