import { useEffect, useState } from 'react'
import { supabase } from "../supabase";
import { RecipeCard } from './RecipeCard'

interface Recipe {
  id: string
  title: string
  ingredient: string
  description: string
  instructions: string
  source: string
}

export function RecipeGallery() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipes() {
      const { data } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
      
      setRecipes(data || [])
      setLoading(false)
    }

    fetchRecipes()
  }, [])

  if (loading) return <div>Loading recipes...</div>

  return (
    <div className="main">

      {/* ⭐ Back button placed EXACTLY like Suggest Listing */}
      <button
        className="back-button"
        onClick={() => window.location.href = '/'}
      >
        ← Back to listings
      </button>

      <div className="recipe-gallery-container">
        <div className="recipe-gallery">
          <h2>Community Recipes 🥘</h2>

          <div className="recipe-grid">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
