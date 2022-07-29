import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

import { CreateRecommendationData, recommendationService } from "../../src/services/recommendationsService.js";

describe("INSERT recomendation", () => {
    it("given a valid recomendation, shoul call prisma funcion", async () => {
        const createInfos = {
            name: "string",
            youtubeLink: "string2"
        }
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((createInfos): any => {
            return {
                name: "string",
                youtubeLink: "string2"
            }
        })

        await recommendationService.insert(createInfos)
        expect(recommendationRepository.create).toBeCalled();
    })

    it("Given a mock that returns true, shoud fall into if condition and throw error", () => {
        const createInfos = {
            name: "string",
            youtubeLink: "string2"
        }
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((createInfos): any => {
            return true
        })

        const promise = recommendationService.insert(createInfos)

        expect(promise).rejects.toEqual({ "type": "conflict", "message": "Recommendations names must be unique" });
    })
})


describe("UPVOTE", () => {
    it("sendind a id number, should call two repositories", async () => {
        
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return true
        })

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(():any =>{
        })

        await recommendationService.upvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })
})