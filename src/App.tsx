import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'
import Admin from './Admin'
import SuggestListing from './SuggestListing'
import { supabase } from './supabase'
import CookieBanner from './CookieNotice';
import './App.css'

type Listing = {
  id: number
  title: string
  location: string
  category: string
  type: string
  description: string
  contact?: string
  image_url?: string
  created_at: string
}

const categories = ['All', 'Veg', 'Fruit', 'Preserves', 'Garden']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showAbout, setShowAbout] = useState(false)

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
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#3D3D3D'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🌱
            </div>
            <h3 style={{
              fontSize: '18px',
              color: '#1a1a1a',
              marginBottom: '8px',
              fontWeight: 500
            }}>
              Nothing here yet
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px',
              color: '#3D3D3D'
            }}>
              Growers are just getting started. Check back soon or be the first to list something!
            </p>
            <a
  href="/?suggest=true"
  style={{
    display: 'inline-block',
    backgroundColor: '#1D9E75',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500,
    textDecoration: 'none'
  }}
>
  Suggest a listing 🌱
</a>
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
              contact={listing.contact}
              image_url={listing.image_url}
              created_at={listing.created_at}  
            />
          ))
        )}

        <div className="footer">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #D0D0D0',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setShowAbout(!showAbout)}
              style={{
                width: '100%',
                padding: '14px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 500,
                color: '#333'
              }}
            >
              <span>About Bristol Larder</span>
              <span style={{
                fontSize: '18px',
                color: '#1D9E75',
                transform: showAbout ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                display: 'inline-block'
              }}>
                +
              </span>
            </button>

            {showAbout && (
              <div style={{
                padding: '0 16px 16px',
                borderTop: '1px solid #f0f0f0'
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: '1.7',
                  marginBottom: '10px',
                  paddingTop: '12px'
                }}>
                  Bristol Larder is a free community platform built by a local BS7 resident for BS6 and BS7 growers, makers and neighbours.
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: '1.7',
                  marginBottom: '10px'
                }}>
                  The idea came from seeing handwritten posters on allotment fences — people with surplus bean poles, too many courgettes, windfall apples — with no easy way of reaching the people who would love them.
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: '1.7',
                  marginBottom: '10px'
                }}>
                  This is the early version. No download needed — just visit on your phone. It's growing, it's free, and it's yours.
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#1D9E75',
                  lineHeight: '1.7',
                  fontWeight: 500
                }}>
                  Have something to share? Hit the button below 🌱
                </p>
              </div>
            )}
          </div>

          <a
  href="/?suggest=true"
  style={{
    display: 'block',
    backgroundColor: '#1D9E75',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '16px',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 500
  }}
>
  Suggest a listing 🌱
</a>

          <p style={{
            fontSize: '12px',
            color: '#6E6E6E',
            textAlign: 'center'
          }}>
            Bristol Larder — connecting Bristol growers and makers 🌱
          </p>
        </div>
      </div>
      <CookieBanner />  
    </div>
  )
}

export default App