import { formatDistanceToNow } from 'date-fns'

type ListingProps = {
  title: string
  location: string
  category: string
  type: string
  description: string
  contact?: string | null
  image_url?: string | null
   created_at: string
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

function getCategoryIcon(category: string) {
  switch(category.toLowerCase()) {
    case 'veg': return '🥕'
    case 'fruit': return '🍎'
    case 'preserves': return '🫙'
    case 'garden': return '🌱'
    default: return '📦'
  }
}

function getTypeClass(type: string) {
  if (type === 'Free') return 'badge-free'
  if (type === 'Swap') return 'badge-swap'
  if (type === 'Wanted') return 'badge-wanted'
  return 'badge-price'
}

function ListingCard({ title, location, category, type, description, contact, image_url,created_at }: ListingProps) {

    const isNew = new Date(created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  return (
    <div className="listing-card" style={{ position: 'relative' }}>
      {isNew && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#1D9E75',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          New
        </div>
      )}
      <h3>{title}</h3>
      <p className="location">{location}</p>
      {image_url && (
  <img
    src={image_url}
    alt={title}
    style={{
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '12px'
    }}
  />
)}
    { created_at && (
      <p style={{
      fontSize: '12px',
      color: '#595959',
      marginTop: '4px'
       }}>
  Posted {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
</p>
    )}
      <p className="description">{description}</p>
      <div className="badges" style={{ marginTop: '12px' }}>
        <span className={`badge ${getCategoryClass(category)}`}>
         {getCategoryIcon(category)} {category}
          </span>
        <span className={`badge ${getTypeClass(type)}`}>
          {type}
        </span>
      </div>
      {contact && (
  <div style={{
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #D0D0D0',
    backgroundColor: '#f9faf9',
    padding: '12px',
    borderRadius: '6px',
    marginLeft: '-12px',
    marginRight: '-12px',
    marginBottom: '-12px'
  }}>
    <p style={{
      fontSize: '11px',
      color: '#888',
      marginBottom: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: 600
    }}>
      Contact
    </p>
    <p style={{
      fontSize: '14px',
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