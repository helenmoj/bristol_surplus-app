import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'
import Admin from './Admin'
import SuggestListing from './SuggestListing'
import { supabase } from './supabase'
import './App.css'

type Listing = {
  id: number
  title: string
  location: string
  category: string
  type: string
  description: string
}

const categories = ['All', 'Veg', 'Fruit', 'Preserves', 'Garden']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  async function fetchListings() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching listings:', error)
    } else {
      setListings(data || [])
    }
    setLoading(false)
  }

  if (window.location.search === '?admin=true') {
    return <Admin />
  }

  if (window.location.search === '?suggest=true') {
    return <SuggestListing />
  }

  const filteredListings = listings
    .filter(listing =>
      activeCategory === 'All' ? true : listing.category === activeCategory
    )
    .filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="app">
      <div className="header">
        <h1>Bristol Larder</h1>
        <p>Connecting Bristol growers and makers</p>
      </div>

      <div className="main">
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <p>Finding listings near you...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing here yet</h3>
            <p>
              No listings in this category right now.
              <br />
              Check back soon or try a different filter.
            </p>
          </div>
        ) : (
          filteredListings.map(listing => (
            <ListingCard
              key={listing.id}
              title={listing.title}
              location={listing.location}
              category={listing.category}
              type={listing.type}
              description={listing.description}
            />
          ))
        )}

        <div className="footer">
          <button
            onClick={() => window.location.href = '/?suggest=true'}
            style={{
              backgroundColor: '#1D9E75',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '16px',
              width: '100%'
            }}
          >
            Suggest a listing
          </button>
          <p>Bristol Larder — connecting Bristol growers and makers 🌱</p>
        </div>
      </div>
    </div>
  )
}

export default App