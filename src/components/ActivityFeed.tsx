import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

type Listing = {
  id: number
  title: string
  location: string
  created_at: string
}

export function ActivityFeed() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentListings()
  }, [])

  async function fetchRecentListings() {
    const { data, error } = await supabase
      .from('listings')
      .select('id, title, location, created_at')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching listings:', error)
    }

    setListings(data || [])
    setLoading(false)
  }

  function getTimeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 60) return 'just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'yesterday'
    return `${diffDays} days ago`
  }

  if (loading) return null

  if (listings.length === 0) return null

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: 600,
        color: '#333'
      }}>
        Recent activity 🌱
      </h3>

      {listings.map((listing) => (
        <div
          key={listing.id}
          style={{
            padding: '8px 0',
            fontSize: '13px',
            color: '#555',
            lineHeight: '1.5',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <span style={{ color: '#1D9E75', fontWeight: 500 }}>
            {listing.title}
          </span>
          {' '}
          ({listing.location}) — {getTimeAgo(listing.created_at)}
        </div>
      ))}
    </div>
  )
}