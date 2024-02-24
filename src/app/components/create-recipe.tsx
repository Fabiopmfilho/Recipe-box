"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

export interface Ingredient {
  id?: string;
  name: string;
  quantity: number;
  unit: string | null;
}

export interface Recipe {
  id?: string;
  title: string;
  image: string;
  type_food: string;
  number_peoples: number;
  dificult: number;
  how_make: string;
  ingredients: Ingredient[];
}

const prisma = new PrismaClient();

export default function NewRecipeForm() {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    image: "",
    type_food: "",
    number_peoples: 0,
    dificult: 0,
    how_make: "",
    ingredients: [],
  });

  const [ingredient, setIngredient] = useState<Ingredient>({
    name: "",
    quantity: 0,
    unit: "",
  });

  function handleChange(e: any) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }

  function handleIngredientChange(e: any) {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  }

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
    setIngredient({ name: "", quantity: 0, unit: "" });
  }

  function removeIngredient(id: any) {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((ing, index) => index !== id),
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const newRecipe = await prisma.recipe.create({
        data: {
          title: recipe.title,
          image: recipe.image,
          type_food: recipe.type_food,
          number_peoples: recipe.number_peoples,
          dificult: recipe.dificult,
          how_make: recipe.how_make,
          ingredients: {
            createMany: {
              data: recipe.ingredients,
            },
          },
        },
        include: {
          ingredients: true,
        },
      });
      console.log('Deu bom', newRecipe)
    } catch (error) {
      console.error("DEU RUIM", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label>
        Nome da receita:
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagem:
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Tipo da refeição:
        <input
          type="text"
          name="type_food"
          value={recipe.type_food}
          onChange={handleChange}
        />
      </label>
      <label>
        Serve quantas pessoas:
        <input
          type="text"
          name="number_peoples"
          value={recipe.number_peoples}
          onChange={handleChange}
        />
      </label>
      <label>
        Dificuldade:
        <input
          type="text"
          name="dificult"
          value={recipe.dificult}
          onChange={handleChange}
        />
      </label>

      <h3>Ingredients:</h3>
      {recipe.ingredients.map((ing, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={ing.name}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].name = e.target.value;
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
              value={ing.quantity}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].quantity = parseInt(e.target.value, 10);
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={ing.unit || ""}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].unit = e.target.value;
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
            />
          </label>
          <button type="button" onClick={() => removeIngredient(index)}>
            Remove
          </button>
        </div>
      ))}
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={handleIngredientChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={ingredient.quantity}
            onChange={handleIngredientChange}
          />
        </label>
        <label>
          Unit:
          <input
            type="text"
            name="unit"
            value={ingredient.unit || ""}
            onChange={handleIngredientChange}
          />
        </label>
        <Button onClick={addIngredient}>Adicionar ingrediente</Button>
      </div>

      <label>Modo de preparo:</label>
      <textarea
        name="how_make"
        value={recipe.how_make}
        onChange={handleChange}
      />

      <Button type="submit" className="mt-5">
        Salvar receita
      </Button>
    </form>
  );
}
