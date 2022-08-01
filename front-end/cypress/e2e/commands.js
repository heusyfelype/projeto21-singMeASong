
Cypress.Commands.add("deleteAllDB", () => {
    cy.request("DELETE", "http://localhost:5000/recommendations/deleteAll").then((res) =>{return res.status});
})


Cypress.Commands.add("createRecommendations", (recommendation) =>{
    cy.get('#input-name').type(recommendation.name);
    cy.get("#input-link").type(recommendation.link);
    cy.intercept("POST", "/recommendations").as("postNewRecommendation")
    cy.get("#input-button").click();
    cy.wait("@postNewRecommendation");
})

export let listOfRecommendations = [];
Cypress.Commands.add("listRecommendations", () =>{
    cy.request("GET", "http://localhost:5000/recommendations").then((res) =>{return res.body});
})