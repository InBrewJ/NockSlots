# react-ts-cypress-jest-starter

Feel free to use this as a template - on GitHub there's a button above to do just this (next to where you'd normally click the dropdown to clone)

- (tested with Node 13.13, should work with 12+)
- React + TS (with CRA)
- Coverage set up for Jest
- Cypress + Gherkin/Cucumber + TS
- Jest
- Yarn

Bootstrapped with:

- Using `npm` because yarn wouldn't install Cypress on my PopOS box :man_shrugging:

```
$ npx create-react-app . --use-npm --template typescript # sets up the latest version of CRA with typescript
$ npm i --save-dev cypress
$ npx @bahmutov/cly init # scaffolds cypress (with js tests)
$ npm i --save-dev cypress-cucumber-preprocessor
$ npm i --save-dev @types/cypress-cucumber-preprocessor
```

Inspired by: https://www.cypress.io/blog/2019/05/13/code-create-react-app-v3-and-its-cypress-tests-using-typescript/

...although this blog is old(ish) and Cypress (as of v4) supports TS out-of-the-box

More from Gleb:

- https://glebbahmutov.com/blog/test-the-interface/

Other necessary set up steps came from the cypress-cucumber-preprocessor docs

- https://www.npmjs.com/package/cypress-cucumber-preprocessor#typeScript-support

## Run tests

```
$ yarn test:all
```

The hope is that the tests themselves document what they are for. One can dream.
