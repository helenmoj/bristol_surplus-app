type ListingProps = {
  title: string
  location: string
  category: string
  type: string
  description: string
  contact?: string
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

function ListingCard({ title, location, category, type, description, contact }: ListingProps) {
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

      {contact && (
        <div style={{
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#888',
            marginBottom: '2px'
          }}>
            Contact
          </p>
          <p style={{
            fontSize: '13px',
            color: '#1D9E75',
            fontWeight: 500
          }}>
            {contact}
          </p>
        </div>
      )}
    </div>
  )
}

export default ListingCard