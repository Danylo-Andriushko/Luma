import { faker } from "@faker-js/faker";

export const registrationData = {
    randomFirstName: faker.person.firstName(),
    randomLastName: faker.person.lastName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password(),
};