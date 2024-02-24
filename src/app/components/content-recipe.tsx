const ContentRecipe = ({ recipe }: any) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.how_make}</p>
      <h3>Ingredientes:</h3>
      <ul>
        {recipe.ingredients.map((ingredient: any) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentRecipe;
