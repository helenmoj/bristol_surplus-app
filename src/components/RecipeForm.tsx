import { useState } from 'react'
import { supabase } from "../supabase";

export function RecipeForm() {
  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('recipes')
      .insert([
        {
          title,
          ingredient,
          description,
          instructions,
          source,
          created_by: 'admin'
        }
      ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Recipe added successfully! ✅')
      setTitle('')
      setIngredient('')
      setDescription('')
      setInstructions('')
      setSource('')
    }

    setLoading(false)
  }

  return (
    <div className="recipe-form-container">
      <h2>Add Recipe 🥘</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          required
        >
          <option value="">Select ingredient...</option>
          <option value="Mint">Mint</option>
          <option value="Strawberries">Strawberries</option>
          <option value="Bay leaves">Bay leaves</option>
          <option value="Courgettes">Courgettes</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Source (e.g. Middle Eastern Cookbook)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  )
}