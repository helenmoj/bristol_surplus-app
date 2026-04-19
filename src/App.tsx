import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'
import Admin from './Admin'
import { supabase } from './supabase'

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

  const filteredListings = listings
    .filter(listing =>
      activeCategory === 'All' ? true : listing.category === activeCategory
    )
    .filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: '#1D9E75',
        marginBottom: '4px'
      }}>
        Bristol Larder
      </h1>

      <p style={{
        color: '#888',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        Connecting Bristol growers and makers
      </p>

      <input
        type="text"
        placeholder="Search listings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '14px',
          marginBottom: '16px',
          boxSizing: 'border-box' as const,
          outline: 'none'
        }}
      />

      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeCategory === category ? '#1D9E75' : '#ddd',
              backgroundColor: activeCategory === category ? '#1D9E75' : 'white',
              color: activeCategory === category ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeCategory === category ? 500 : 400
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{
          color: '#888',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          Loading listings...
        </p>
      ) : filteredListings.length === 0 ? (
        <p style={{
          color: '#888',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          No listings in this category yet.
        </p>
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

    </div>
  )
}

export default App