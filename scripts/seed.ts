const Prisma = require('@prisma/client');
const { PrismaClient } = Prisma;

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {name: "Comunicação"},
        {name: "Ciencia da Computação"},
        {name: "Fotografia"},
        {name: "Bem estar"},
        {name: "Marketing Digital"},
        {name: "Música"},
        {name: "Influencer"},
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