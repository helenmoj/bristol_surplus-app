type ListingProps = {
  title: string
  location: string
  category: string
  type: string
  description: string
}

function getCategoryClass(category: string) {
  switch(category.toLowerCase()) {
    case 'veg': return 'badge-veg'
    case 'fruit': return 'badge-fruit'
    case 'preserves': return 'badge-preserves'
    case 'garden': return 'badge-garden'
    default: return 'badge-other'
  }
}

function getTypeClass(type: string) {
  if (type === 'Free') return 'badge-free'
  if (type === 'Swap') return 'badge-swap'
  if (type === 'Wanted') return 'badge-wanted'
  return 'badge-price'
}

function ListingCard({ title, location, category, type, description }: ListingProps) {
  return (
    <div className="listing-card">
      <h3>{title}</h3>
      <p className="location">{location}</p>
      <p className="description">{description}</p>
      <div className="badges">
        <span className={`badge ${getCategoryClass(category)}`}>
          {category}
        </span>
        <span className={`badge ${getTypeClass(type)}`}>
          {type}
        </span>
      </div>
    </div>
  )
}

export default ListingCard
