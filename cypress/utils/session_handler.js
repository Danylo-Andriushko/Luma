export const checkIfLocalStorageIsNotContainData = (firstName, lastName) => {
    cy.getAllLocalStorage().then((localStorage) => {
        const keys = Object.keys(localStorage);
        const keysToCheck = [firstName, lastName];
        keysToCheck.forEach((key) => {
          expect(keys.includes(key)).to.be.false;
        });
      });
}