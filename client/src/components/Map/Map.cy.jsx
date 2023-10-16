import React from "react";
import { BrowserRouter } from "react-router-dom";
import Map from "./Map";

describe("<Map />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <Map />
      </BrowserRouter>
    );
  });
});

describe("Map Component Test", () => {
  it("should display the map container", () => {
    cy.mount(
      <div>
        <BrowserRouter>
          <Map />
        </BrowserRouter>
      </div>
    );
    cy.get(".map-container").should("exist");
  });
});