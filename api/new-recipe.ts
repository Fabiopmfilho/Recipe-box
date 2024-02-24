// api/new-recipe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, image, type_food, number_peoples, dificult, how_make, ingredients } = req.body;
      
      // Cria a receita
      const newRecipe = await prisma.recipe.create({
        data: {
          title,
          image,
          type_food,
          number_peoples,
          dificult,
          how_make,
          ingredients: {
            createMany: {
              data: ingredients,
            },
          },
        },
        include: {
          ingredients: true,
        },
      });

      res.status(200).json(newRecipe);
    } catch (error) {
      console.error('Erro ao criar a receita:', error);
      res.status(500).json({ error: 'Erro ao criar a receita.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
