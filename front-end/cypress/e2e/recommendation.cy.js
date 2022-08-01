/// <reference types="cypress" />
import './commands';
import { faker } from "@faker-js/faker"

const URL = "http://localhost:3000/";

describe("Home Scrreen", () => {
    it("Given a valid name an link from youtube, it should create a recommendation", () => {
        const toCreateRecommendations = {
            name: faker.name.findName(),
            link: "https://youtu.be/fe4EK4HSPkI"
        }
        cy.visit(`${URL}`);
        cy.deleteAllDB();
        cy.get('#input-name').type(toCreateRecommendations.name);
        cy.get("#input-link").type(toCreateRecommendations.link);
        cy.intercept("POST", "/recommendations").as("postNewRecommendation")
        cy.get("#input-button").click();
        cy.wait("@postNewRecommendation");
        cy.get("#video-container > div").should("contain", toCreateRecommendations.name)
    })

    it("given a click in upvote, should increment vote", () => {
        const toCreateRecommendations = [{
            name: faker.name.findName(),
            link: "https://youtu.be/fe4EK4HSPkI"
        }, {
            name: faker.name.findName(),
            link: "https://youtu.be/fe4EK4HSPkI"
        }]

        cy.visit(`${URL}`);
        cy.deleteAllDB();
        for(let each of toCreateRecommendations){
            cy.createRecommendations(each)
        }
        cy.intercept("GET", "/recommendations").as("listRecommendations")
        const infos = cy.listRecommendations();
        cy.wait("@listRecommendations");
        cy.log(infos)
        cy.contains(`${toCreateRecommendations[1].name}`).get("#grow-up").click()
        cy.contains(`${toCreateRecommendations[1].name}`).get("#grow-up").click()
        cy.contains(`${toCreateRecommendations[1].name}`).get("#qtt-votes").should("contain", 2)


    })

    it("given a click in downvote, should decrement vote", () => {
        const toCreateRecommendations = [{
            name: faker.name.findName(),
            link: "https://youtu.be/fe4EK4HSPkI"
        }, {
            name: faker.name.findName(),
            link: "https://youtu.be/fe4EK4HSPkI"
        }]

        cy.visit(`${URL}`);
        cy.deleteAllDB();
        for(let each of toCreateRecommendations){
            cy.createRecommendations(each)
        }
        cy.contains(`${toCreateRecommendations[1].name}`).get("#grow-down").click()
        cy.contains(`${toCreateRecommendations[1].name}`).get("#grow-down").click()
        cy.contains(`${toCreateRecommendations[1].name}`).get("#qtt-votes").should("contain", -2)


    })
})