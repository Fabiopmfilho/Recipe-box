// components/RecipeList.js
import React, { useEffect, useState } from 'react';
// import { Dialog, DialogTrigger, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import axios from 'axios';
import CardRecipe from './card-recipe';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import ContentRecipe from './content-recipe';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await axios.get('/api/recipes');
      setRecipes(res.data);
    }
    fetchRecipes();
  }, []);

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
              <ContentRecipe recipe={recipe} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </main>
  );
}
