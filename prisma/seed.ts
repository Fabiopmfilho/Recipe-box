const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.recipe.create({
      data: {
        title: 'Macarrão com Queijo',
        image: 'https://utfs.io/f/8e98711c-c5f6-487b-ad10-b63ab170bc3b-xzqjat.jpeg',
        type_food: 'Jantar',
        number_peoples: 4,
        dificult: 3,
        how_make: 'Cozinhe o macarrão e misture com queijo derretido.',
        ingredients: {
          create: [
            {
              name: 'Macarrão',
              quantity: 300,
              unit: 'g'
            },
            {
              name: 'Queijo',
              quantity: 200,
              unit: 'g'
            },
            {
              name: 'Sal',
              quantity: 1,
              unit: 'pitada'
            }
          ]
        }
      },
    }),
    prisma.recipe.create({
      data: {
        title: 'Salada de Frutas',
        image: 'https://utfs.io/f/623d9323-d061-44f1-9832-656e7c657e3a-g2j14o.jpeg',
        type_food: 'Sobremesa',
        number_peoples: 2,
        dificult: 1,
        how_make: 'Corte as frutas e misture em uma tigela.',
        ingredients: {
          create: [
            {
              name: 'Banana',
              quantity: 2,
              unit: ''
            },
            {
              name: 'Maçã',
              quantity: 1,
              unit: ''
            },
            {
              name: 'Morango',
              quantity: 100,
              unit: 'g'
            },
            {
              name: 'Uva',
              quantity: 100,
              unit: 'g'
            },
            {
              name: 'Laranja',
              quantity: 1,
              unit: ''
            }
          ]
        }
      },
    }),
  ]);
}


main()
  .catch((error) => {
    console.log("Não foi possível criar as receitas!", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
