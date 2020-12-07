import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url: string = "http://localhost:3000"; // see, Typescript!
const aNumber = "43";
const nonRandomResponse = `The number was: ${aNumber} -> Chuck says: Chuck Norris loves NockSlots`;

Given("I open the local dev server", () => {
  cy.visit(url);
});

Then("I see the welcome message from GraphQL", () => {
  cy.get(".App-logo");
});

When(`I type in a number into the form`, () => {
  cy.get("[data-id=queue-form]").type(aNumber);
});

And(`I press Send to Queue`, () => {
  cy.get("[data-id=queue-send-button]").click();
});

Then(`I see the correct number and an associated response`, () => {
  cy.get("[data-id=queue-response-box]").contains(aNumber);
  cy.get("[data-id=queue-response-box]").contains(nonRandomResponse);
});
