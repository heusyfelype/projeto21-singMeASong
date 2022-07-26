// import bcrypt from "bcrypt";

import { prisma } from "../src/database.js";

// create admin user
async function main(){
	// cria se já não existe -> se já existe, faz nada
  await prisma.recommendation.upsert({
    where: { name: "Tom Odell - Can't pretend" },
    update: {},
    create: {
      name: "Tom Odell - Can't pretend",
      youtubeLink: "https://www.youtube.com/watch?v=B4-OxOmsqR0&list=RDB4-OxOmsqR0&start_radio=1"
    }
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})