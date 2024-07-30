import { faker } from "@faker-js/faker";

export const shippingRandomData = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.person.firstName(),
    randomLastName: faker.person.lastName(),
    randomCompany: faker.company.name(),
    randomStreetAddress: faker.location.street(),
    randomCity: faker.location.city(),
    randomCountry: 'Ukraine',
    randomState: 'Lvivska obl.',
    randomPostalCode:faker.location.zipCode(),
    randomPhone: faker.phone.number()
};