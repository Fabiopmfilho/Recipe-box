import { PrismaClient } from "@prisma/client";
import CardRecipe from "../components/card-recipe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewRecipeButton from "../components/create-recipe";
import { Button } from "@/components/ui/button";

export default async function Home() {

  const prisma = new PrismaClient();
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });

  return (
    <main>
      <div className="flex flex-col justify-center items-center mt-4 gap-5 rounded md:flex-row">
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

      {/* new */}
      <Dialog>
        <DialogTrigger>
          <Button>+</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <h1 className="flex justify-center text-3xl mb-4">Nova receita</h1>
          </DialogHeader>

          <NewRecipeButton />
        </DialogContent>
      </Dialog>
    </main>
  );
}
