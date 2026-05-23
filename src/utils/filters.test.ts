import { describe, it, expect } from 'vitest'
import { filterByCategory, searchListings } from './filters'

const mockListings = [
  { id: '1', title: 'Courgettes', category: 'Veg', description: 'Fresh courgettes' },
  { id: '2', title: 'Spider plants', category: 'Garden', description: 'Healthy plants' },
  { id: '3', title: 'Apple chutney', category: 'Preserves', description: 'Homemade chutney' },
  { id: '4', title: 'Tomatoes', category: 'Veg', description: 'Ripe tomatoes' },
]

describe('filterByCategory', () => {
  it('returns all listings when category is "All"', () => {
    const result = filterByCategory(mockListings, 'All')
    expect(result).toHaveLength(4)
  })

  it('filters by specific category', () => {
    const result = filterByCategory(mockListings, 'Veg')
    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Courgettes')
    expect(result[1].title).toBe('Tomatoes')
  })

  it('returns empty array when no matches', () => {
    const result = filterByCategory(mockListings, 'Fruit')
    expect(result).toHaveLength(0)
  })
})

describe('searchListings', () => {
  it('finds listings by title', () => {
    const result = searchListings(mockListings, 'spider')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Spider plants')
  })

  it('finds listings by description', () => {
    const result = searchListings(mockListings, 'homemade')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Apple chutney')
  })

  it('is case-insensitive', () => {
    const result = searchListings(mockListings, 'COURGETTES')
    expect(result).toHaveLength(1)
  })

  it('returns empty array when no matches', () => {
    const result = searchListings(mockListings, 'bananas')
    expect(result).toHaveLength(0)
  })
})