import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

import { CreateRecommendationData, recommendationService } from "../../src/services/recommendationsService.js";

describe("INSERT recomendation", () => {
    it("given a valid recomendation, shoul call prisma funcion", async () => {
        const createInfos = {
            name: "string",
            youtubeLink: "string2"
        }
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((createInfos): any => {
            return false
        })
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

        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
        })

        await recommendationService.upvote(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })
})

describe("DOWNVOTE", () => {
    it("Should call update score, but not remove", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return true
        })
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {
                score: 1
            }
        })
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { })
        await recommendationService.downvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    })

    it("Should call remove functinos", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return true
        })
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return {
                score: -6
            }
        })
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { })
        await recommendationService.downvote(1);

        expect(recommendationRepository.remove).toBeCalled();
    })

})

describe("GET_BY_ID_OR_FAIL", () => {
    it("Should find a recomendation", async () => {
        const recomendation = {
            "name": "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            "youtubeLink": "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0"
        }
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return recomendation
        })

        const result = await recommendationService.getById(1);
        expect(recommendationRepository.find).toBeCalled();
        expect(result).toBe(recomendation)
    })

    it("given a not foundable user, should throw an error", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {
            return false
        })

        const promise = recommendationService.getById(1)

        expect(promise).rejects.toEqual({ "type": "not_found", "message": "" });
    })



})





describe("GET", () => {
    it("Should find all recomendations", async () => {
        const recomendation = [{
            "name": "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            "youtubeLink": "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0"
        }, {
            "name": "Tom Odell - Can't Pretend (at Dean Street Studios)",
            "youtubeLink": "https://youtu.be/B4-OxOmsqR0?list=RDB4-OxOmsqR0"
        }
        ]
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {
            return recomendation
        })

        const result = await recommendationService.get();
        expect(result).toBe(recomendation)

    })
})

describe("GET_TOP", () => {
    it("Should find recomendations until the limit", async () => {
        const allRecommendations = [{
            "name": "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            "youtubeLink": "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0"
        }, {
            "name": "Tom Odell - Can't Pretend (at Dean Street Studios)",
            "youtubeLink": "https://youtu.be/B4-OxOmsqR0?list=RDB4-OxOmsqR0"
        }, {
            "name": "Kate Bush - Running Up That Hill - Official Music Video",
            "youtubeLink": "https://youtu.be/wp43OdtAAkM?list=RDB4-OxOmsqR0"
        }, {
            "name": "Stromae - Fils de joie (Official Music Video)",
            "youtubeLink": "https://youtu.be/M7Z2tgJo8Hg?list=RDB4-OxOmsqR0"
        }
        ]

        const limit = Math.floor(Math.random() * allRecommendations.length)
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => {
            return allRecommendations
        })
        const result = await recommendationService.getTop(limit);
        expect(result).toBe(allRecommendations)
    })

})

describe("GET_RAMDOM", () => {
    it("Should find a random recomendation", async () => {
        const allRecommendations = [{
            id: 1,
            name: "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            youtubeLink: "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0",
            score: 11,
        }]

        jest.spyOn(global.Math, "random").mockImplementationOnce((): any => {
            return 0.5;
        })
        jest.spyOn(recommendationRepository, "findAll").mockImplementation((): any => {
            return [allRecommendations[0]];
        })
        jest.spyOn(global.Math, "floor").mockImplementationOnce((): any => {
            return 0;
        })
        const result = await recommendationService.getRandom();
        expect(result).toBe(allRecommendations[0])
    })
    it("Should throw an error instead random recomendation", async () => {
        const allRecommendations = [{
            id: 1,
            name: "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            youtubeLink: "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0",
            score: 9,
        }]

        jest.spyOn(global.Math, "random").mockImplementationOnce((): any => {
            return 0.9;
        })
        jest.spyOn(recommendationRepository, "findAll").mockImplementation((): any => {
            return [];
        })
        jest.spyOn(global.Math, "floor").mockImplementationOnce((): any => {
            return 0;
        })
        const result = recommendationService.getRandom();
        expect(result).rejects.toEqual({"type": "not_found", 'message': '' })
    })

})