interface Recipe {
  id: string
  title: string
  ingredient: string
  description: string
  instructions: string
  source: string
  image_url?: string
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p className="ingredient-tag">📌 Made with: {recipe.ingredient}</p>
      <p className="description">{recipe.description}</p>
      <p className="instructions">{recipe.instructions}</p>
      <p className="source">— {recipe.source}</p>
    </div>
  )
}
