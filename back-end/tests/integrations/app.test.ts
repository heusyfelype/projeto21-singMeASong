import app from "../../src/app.js";
import { jest } from "@jest/globals";
import supertest, { Request } from "supertest";
import { prisma } from "./../../src/database.js"
import * as factory from "./factories/recomendationsFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
})

describe("POST /recommendations", () => {
    it("given a name and a url, it should return created", async () => {
        const body = factory.arrCreateRecommendations[0];
        const firstTry = await supertest(app).post("/recommendations").send(body);
        expect(firstTry.status).toEqual(201);
    })
    it("given the same name and a url two times, it should return error 409", async () => {
        const body = factory.arrCreateRecommendations[0];
        const firstTry = await supertest(app).post("/recommendations").send(body);
        const SecondTry = await supertest(app).post("/recommendations").send(body);

        expect(SecondTry.status).toEqual(409);
    })
})

describe("GET /recomendations", () => {
    it("it should return 10 videos", async () => {
        factory.createAllRecommendations();
        const response = await supertest(app).get("/recommendations")
        console.log("RESPONSNE::::::::::: ", response.body)
        expect(response.body).toHaveLength(10);
    })
})