import app from "../src/app.js";
import supertest from "supertest";

describe("POST /recommendations", () =>{
    it("given a name and a url, it should return created", async () =>{
        const body = {
            "name": "Adele - I Drink Wine (Live at The BRIT Awards 2022)",
            "youtubeLink": "https://youtu.be/LwXQ7WUh-D0?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0"
        }
        const firstTry = await supertest(app).post("/recommendations").send(body);
        expect(firstTry.status).toEqual(201)
    })

})