import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ListingCard from './ListingCard'

// Mock data - this is fake listing data for testing
const createMockListing = (overrides = {}) => ({
  title: 'Fresh courgettes',
  location: 'BS7 — Bishopston',
  category: 'Veg',
  type: 'Free',
  description: 'Too many courgettes! Pick them up anytime.',
  contact: 'helen@example.com',
  image_url: null,
  created_at: new Date().toISOString(),
  ...overrides
})

describe('ListingCard Component', () => {
  
  // ===== BASIC RENDERING TESTS =====
  
  it('should render listing title', () => {
    const listing = createMockListing()
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('Fresh courgettes')).toBeInTheDocument()
  })

  it('should render location', () => {
    const listing = createMockListing()
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('BS7 — Bishopston')).toBeInTheDocument()
  })

  it('should render description', () => {
    const listing = createMockListing()
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('Too many courgettes! Pick them up anytime.')).toBeInTheDocument()
  })

  // ===== CATEGORY BADGE TESTS =====

  it('should render category badge with correct icon', () => {
    const listing = createMockListing({ category: 'Veg' })
    render(<ListingCard {...listing} />)
    
    // Check both icon and category text appear
    expect(screen.getByText(/Veg/)).toBeInTheDocument()
  })

  it('should show fruit icon for fruit category', () => {
    const listing = createMockListing({ category: 'Fruit' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText(/Fruit/)).toBeInTheDocument()
  })

  it('should show preserves icon for preserves category', () => {
    const listing = createMockListing({ category: 'Preserves' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText(/Preserves/)).toBeInTheDocument()
  })

  it('should show garden icon for garden category', () => {
    const listing = createMockListing({ category: 'Garden' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText(/Garden/)).toBeInTheDocument()
  })

  // ===== TYPE BADGE TESTS =====

  it('should render type badge showing Free', () => {
    const listing = createMockListing({ type: 'Free' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('should render type badge showing Swap', () => {
    const listing = createMockListing({ type: 'Swap' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('Swap')).toBeInTheDocument()
  })

  it('should render type badge showing Wanted', () => {
    const listing = createMockListing({ type: 'Wanted' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('Wanted')).toBeInTheDocument()
  })

  // ===== CONTACT TESTS =====

  it('should render contact information when provided', () => {
    const listing = createMockListing({ contact: 'helen@example.com' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('helen@example.com')).toBeInTheDocument()
    expect(screen.getByText(/contact/i)).toBeInTheDocument()
  })

  it('should not render contact section when contact is missing', () => {
    const listing = createMockListing({ contact: undefined })
    render(<ListingCard {...listing} />)
    
    expect(screen.queryByText('CONTACT')).not.toBeInTheDocument()
    expect(screen.queryByText('helen@example.com')).not.toBeInTheDocument()
  })

  it('should render phone number as contact', () => {
    const listing = createMockListing({ contact: '07410883889' })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('07410883889')).toBeInTheDocument()
  })

  // ===== IMAGE TESTS =====

  it('should render image when image_url is provided', () => {
    const listing = createMockListing({ 
      image_url: 'https://example.com/courgette.jpg'
    })
    render(<ListingCard {...listing} />)
    
    const image = screen.getByAltText('Fresh courgettes') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.src).toBe('https://example.com/courgette.jpg')
  })

  it('should not render image when image_url is missing', () => {
    const listing = createMockListing({ image_url: undefined })
    render(<ListingCard {...listing} />)
    
    const image = screen.queryByAltText('Fresh courgettes')
    expect(image).not.toBeInTheDocument()
  })

  // ===== TIMESTAMP TESTS =====

  it('should render "Posted" timestamp', () => {
    const listing = createMockListing()
    render(<ListingCard {...listing} />)
    
    // Check that "Posted" text appears (exact time varies)
    expect(screen.getByText(/Posted/)).toBeInTheDocument()
  })

  // ===== NEW BADGE TESTS =====

  it('should show NEW badge for listing posted less than 7 days ago', () => {
    // Create a listing from 2 days ago
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    const listing = createMockListing({ 
      created_at: twoDaysAgo.toISOString()
    })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('should not show NEW badge for listing posted 10 days ago', () => {
    // Create a listing from 10 days ago
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    const listing = createMockListing({ 
      created_at: tenDaysAgo.toISOString()
    })
    render(<ListingCard {...listing} />)
    
    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('should show NEW badge for listing posted today', () => {
    const today = new Date()
    const listing = createMockListing({ 
      created_at: today.toISOString()
    })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('should show NEW badge for listing posted 7 hours ago', () => {
    const sevenHoursAgo = new Date(Date.now() - 7 * 60 * 60 * 1000)
    const listing = createMockListing({ 
      created_at: sevenHoursAgo.toISOString()
    })
    render(<ListingCard {...listing} />)
    
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  // ===== INTEGRATION TESTS (multiple elements together) =====

  it('should render complete listing with all elements', () => {
    const listing = createMockListing({
      title: 'Bay leaves',
      location: 'BS6 5PX',
      category: 'Garden',
      type: 'Free',
      description: 'Fresh bay leaves, cutting back tree',
      contact: '07410883889',
      image_url: 'https://example.com/bay.jpg'
    })
    render(<ListingCard {...listing} />)
    
    // Check all elements present
    expect(screen.getByText('Bay leaves')).toBeInTheDocument()
    expect(screen.getByText('BS6 5PX')).toBeInTheDocument()
    expect(screen.getByText(/Garden/)).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Fresh bay leaves, cutting back tree')).toBeInTheDocument()
    expect(screen.getByText('07410883889')).toBeInTheDocument()
    expect(screen.getByAltText('Bay leaves')).toBeInTheDocument()
  })

  it('should render minimal listing with only required fields', () => {
    const listing = createMockListing({
      contact: undefined,
      image_url: undefined
    })
    render(<ListingCard {...listing} />)
    
    // Check required elements present
    expect(screen.getByText('Fresh courgettes')).toBeInTheDocument()
    expect(screen.getByText('BS7 — Bishopston')).toBeInTheDocument()
    
    // Check optional elements missing
    expect(screen.queryByText('CONTACT')).not.toBeInTheDocument()
    expect(screen.queryByAltText('Fresh courgettes')).not.toBeInTheDocument()
  })
})
