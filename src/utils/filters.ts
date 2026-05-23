export interface Listing {
  id: string
  title: string
  category: string
  description: string
}

export function filterByCategory(listings: Listing[], category: string): Listing[] {
  if (category === 'All') return listings
  return listings.filter(listing => listing.category === category)
}

export function searchListings(listings: Listing[], query: string): Listing[] {
  const lowerQuery = query.toLowerCase()
  return listings.filter(listing =>
    listing.title.toLowerCase().includes(lowerQuery) ||
    listing.description.toLowerCase().includes(lowerQuery)
  )
}