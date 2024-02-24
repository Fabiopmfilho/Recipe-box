// pages/api/recipes.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const recipes = await prisma.recipe.findMany();
  res.status(200).json(recipes);
}
