const Prisma = require('@prisma/client');
const { PrismaClient } = Prisma;

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {name: "Música"},
        {name: "Fotografia"},
        {name: "Bem estar"},
        {name: "Influencer"},
        {name: "Ciência da Computação"},
        {name: "Marketing Digital"},
        {name: "Comunicação"},
      ]
    })
    console.log("Sucesso!")
    
  } catch (error) {
    console.log("Erro ao alimentar o banco de dados 'Categorias'", error);
  } finally {
    await database.$disconnect();
  }
}

main()