type ListingProps = {
  title: string
  location: string
  category: string
  type: string
  description: string
}

function ListingCard({ title, location, category, type, description }: ListingProps) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ 
        margin: '0 0 6px 0',
        color: '#1a1a1a',
        fontSize: '16px'
      }}>
        {title}
      </h3>

      <p style={{ 
        margin: '0 0 8px 0',
        color: '#888',
        fontSize: '13px'
      }}>
        {location}
      </p>

      <p style={{ 
        margin: '0 0 10px 0',
        color: '#444',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        {description}
      </p>

      <div>
        <span style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          marginRight: '6px',
          backgroundColor: 
            category === 'Veg' ? '#EAF3DE' :
            category === 'Fruit' ? '#FAEEDA' :
            category === 'Preserves' ? '#E1F5EE' : '#EEEDFE',
          color: '#333'
        }}>
          {category}
        </span>

        <span style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          backgroundColor: 
            type === 'Free' ? '#E6F1FB' :
            type === 'Swap' ? '#FBEAF0' :
            type === 'Wanted' ? '#EEEDFE' : '#EAF3DE',
          color: '#333'
        }}>
          {type}
        </span>
      </div>
    </div>
  )
}

export default ListingCard


