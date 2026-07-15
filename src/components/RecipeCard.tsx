import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

interface Recipe {
  id: string
  title: string
  ingredient: string
  description: string
  instructions: string
  source: string
  image_url?: string
  created_by: string
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get likes on mount
  useEffect(() => {
    fetchLikes()
  }, [recipe.id])

  async function fetchLikes() {
    try {
      const { data, error } = await supabase
        .from('recipe_likes')
        .select('*')
        .eq('recipe_id', recipe.id)

      if (error) throw error

      setLikeCount(data?.length || 0)
      
      // Check if user has liked (stored in localStorage)
      const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') || '[]')
      setIsLiked(likedRecipes.includes(recipe.id))
    } catch (error) {
      console.error('Error fetching likes:', error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleLike() {
    try {
      const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') || '[]')
      
      if (isLiked) {
        // Unlike - remove from database
        await supabase
          .from('recipe_likes')
          .delete()
          .eq('recipe_id', recipe.id)
          .eq('id', (await supabase
            .from('recipe_likes')
            .select('id')
            .eq('recipe_id', recipe.id)
            .limit(1))[0]?.data?.[0]?.id)
        
        setLikeCount(Math.max(0, likeCount - 1))
        setIsLiked(false)
        
        // Remove from localStorage
        const updated = likedRecipes.filter((id: string) => id !== recipe.id)
        localStorage.setItem('likedRecipes', JSON.stringify(updated))
      } else {
        // Like - add to database
        await supabase
          .from('recipe_likes')
          .insert([{ recipe_id: recipe.id }])
        
        setLikeCount(likeCount + 1)
        setIsLiked(true)
        
        // Add to localStorage
        localStorage.setItem('likedRecipes', JSON.stringify([...likedRecipes, recipe.id]))
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: '#fafafa'
    }}>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '4px',
            marginBottom: '12px'
          }}
        />
      )}

      <h3 style={{ margin: '0 0 8px 0' }}>{recipe.title}</h3>
      
      <p style={{
        fontSize: '13px',
        color: '#666',
        margin: '4px 0'
      }}>
        <strong>Ingredient:</strong> {recipe.ingredient}
      </p>

      {recipe.description && (
        <p style={{
  fontSize: '14px',
  color: '#555',
  margin: '8px 0',
  whiteSpace: 'pre-wrap'
}}>
  {recipe.description}
</p>

      )}

     <p style={{
  fontSize: '13px',
  color: '#666',
  margin: '8px 0',
  whiteSpace: 'pre-wrap'
}}>
  <strong>How to make it:</strong> {recipe.instructions}
</p>

      {recipe.source && (
        <p style={{
          fontSize: '12px',
          color: '#999',
          margin: '8px 0'
        }}>
          <strong>From:</strong> {recipe.source}
        </p>
      )}

      {recipe.created_by && (
        <p style={{
          fontSize: '12px',
          color: '#999',
          margin: '8px 0'
        }}>
          <strong>Shared by:</strong> {recipe.created_by}
        </p>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <button
          onClick={toggleLike}
          disabled={loading}
          style={{
            backgroundColor: isLiked ? '#ef4444' : '#f3f4f6',
            color: isLiked ? 'white' : '#333',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            opacity: loading ? 0.6 : 1
          }}
        >
          {isLiked ? '❤️' : '🤍'} {likeCount}
        </button>
      </div>
    </div>
  )
}
