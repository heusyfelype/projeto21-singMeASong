import app from "../../src/app.js";
import { jest } from "@jest/globals";
import supertest from "supertest";
import { prisma } from "./../../src/database.js"
import * as factory from "./factories/recomendationsFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
    jest.clearAllMocks();
    jest.resetAllMocks();
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
        await factory.createAllRecommendations();
        const response = await supertest(app).get("/recommendations")
        expect(response.body).toHaveLength(10);
    })
})

describe("GET /random", () => {
    it("with math.random mocked in 0.5, it should return the correct song from recommendations creation array", async () => {
        await factory.createWithScore();
        jest.spyOn(global.Math, "random").mockImplementation((): any => {
            return 0.6
        })
        const response = await supertest(app).get("/recommendations/random")

        expect(response.body.name).toBe(factory.arrCreateRecommendations[factory.arrCreateRecommendations.length - 4].name)
    })

    it("with math.random mocked in 0.8, it should return index 1 from recommendations creation array", async () => {
        await factory.createWithScore();
        jest.spyOn(global.Math, "random").mockImplementation((): any => {
            return 0.8
        })
        const response = await supertest(app).get("/recommendations/random")

        expect(response.body.name).toBe(factory.arrCreateRecommendations[1].name)
    })
})