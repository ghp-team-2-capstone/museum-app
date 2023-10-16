import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../Redux/store";
import Login from "./Login";

describe("<Login />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  // first param: string that describes the test
  // second param: callback that does the test code
  it("should autofocus on the username input", () => {
    //see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // querySelect the correct html element
    cy.focused().should("have.id", "username");
  });

  it("checks that there is an h1 with text Login", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // getting the h2 with a "querySelector"
    // checking that it says Login
    cy.get("h1").contains("Login");
  });

  it("username input should accept typing", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const typedVal = "clee123";
    cy.get("#username").type(typedVal).should("have.value", typedVal);
  });

  it("password input should accept typing", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const typedVal = "password";
    cy.get("#password").type(typedVal).should("have.value", typedVal);
  });

  it("button should be clickable", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    cy.get(".login-btn").click();
  });
});
