import supertest from "supertest"
import app from "../../../src/app.js"
import { prisma } from "../../../src/database.js"

export const arrCreateRecommendations = [{
    "name": "Rammstein - Deutschland (Official Video)",
    "youtubeLink": "https://youtu.be/NeQM1c-XCDc"
}, {
    "name": "ZAYN - Dusk Till Dawn (Official Video) ft. Sia",
    "youtubeLink": "https://youtu.be/tt2k8PGm-TI?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMLwXQ7WUh-D0"
}, {
    "name": "Daft Punk - Instant Crush (Video) ft. Julian Casablancas",
    "youtubeLink": "https://youtu.be/a5uQMwRMHcs"
}, {
    "name": "Stromae - Fils de joie (Official Music Video)",
    "youtubeLink": "https://youtu.be/M7Z2tgJo8Hg"
}, {
    "name": "MGMT - Kids (Official HD Video)",
    "youtubeLink": "https://youtu.be/fe4EK4HSPkI"
}, {
    "name": "M83 - 'Wait' (Official Video)",
    "youtubeLink": "https://youtu.be/lAwYodrBr2Q"
}, {
    "name": "Pink Floyd Another Brick In The Wall (HQ)",
    "youtubeLink": "https://youtu.be/bZwxTX2pWmw"
}, {
    "name": "David Gilmour - Rattle That Lock (Official Music Video)",
    "youtubeLink": "https://youtu.be/L1v7hXEQhsQ"
}, {
    "name": "The Killers - Mr. Brightside (Official Music Video)",
    "youtubeLink": "https://youtu.be/gGdGFtwCNBE"
}, {
    "name": "Muse - Madness",
    "youtubeLink": "https://youtu.be/Ek0SgwWmF9w"
}, {
    "name": "Empire Of The Sun - Way To Go (Official Video)",
    "youtubeLink": "https://youtu.be/xg9ebVTL9yE"
}
]


export async function createAllRecommendations() {
    return await prisma.recommendation.createMany({ data: arrCreateRecommendations })
}

export let insertedSongs = []
export async function createWithScore() {
    insertedSongs = []
    for (let i = 0; i < arrCreateRecommendations.length; i++) {
        const song = await prisma.recommendation.create({
            data: {
                name: arrCreateRecommendations[i].name,
                youtubeLink: arrCreateRecommendations[i].youtubeLink,
                score: i + 5
            }
        })
        insertedSongs.push(song)
    }

}