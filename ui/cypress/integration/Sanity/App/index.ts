import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url: string = "http://localhost:3000"; // see, Typescript!

Given("I open the local dev server", () => {
  cy.visit(url);
});

Then("I see the NockSlots logo", () => {
  cy.contains("InNiT SiMPlE!");
});
