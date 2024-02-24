import { PrismaClient } from "@prisma/client";
import CardRecipe from "../components/card-recipe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string | null;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  type_food: string;
  number_peoples: number;
  dificult: number;
  how_make: string;
  ingredients: Ingredient[];
}

export default async function Home() {
  const prisma = new PrismaClient();
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });

  return (
    <main>
      <div className="flex flex-col justify-center items-center mt-4 gap-5 rounded">
        {recipes.map((recipe: any) => (
          <Dialog key={recipe.id}>
            <DialogTrigger>
              <CardRecipe
                key={recipe.id}
                img={recipe.image}
                recipeTitle={recipe.title}
              />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{recipe.title}</DialogTitle>
              </DialogHeader>

              <div>
                <p>{recipe.type_food}</p>
                <p>Dificuldade: {recipe.dificult}</p>
                <p>Serve até {recipe.number_peoples} Pessoas</p>
              </div>

              <h3>Ingredientes:</h3>
              <ul>
                {recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient.id}>
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>

              <h3>Modo de preparo</h3>
              <p>{recipe.how_make}</p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </main>
  );
}
