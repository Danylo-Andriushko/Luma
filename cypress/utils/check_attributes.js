export const checkAttributesFields = (attributesValues, fieldsAttributes) => {
    Object.keys(attributesValues).forEach(attribute => {
        const attributeLabel = attributesValues[attribute];
        fieldsAttributes(attributeLabel).should('be.visible');
    });
};

export const checkRequiredAttributesFields = (attributesValues, fieldsAttributes) => {
    Object.keys(attributesValues).forEach(attribute => {
        const attributeLabel = attributesValues[attribute];
        fieldsAttributes(attributeLabel).then(($label) => {
            const content = window
              .getComputedStyle($label[0], "::after")
              .getPropertyValue("content");
            expect(content).to.eq('"*"');
        });
    });
};