import ListingCard from './ListingCard'

type Listing = {
  id: number
  title: string
  location: string
  category: string
  type: string
  description: string
}

const listings: Listing[] = [
  {
    id: 1,
    title: 'Surplus courgettes',
    location: 'BS7 — Bishopston',
    category: 'Veg',
    type: 'Free',
    description: 'Grew far too many this year — happy for someone to pickle or preserve them.'
  },
  {
    id: 2,
    title: 'Pickled red onions',
    location: 'BS7 — Bishopston',
    category: 'Preserves',
    type: '£3.50',
    description: 'Homemade small batch. Pink peppercorns and fennel seeds.'
  },
  {
    id: 3,
    title: 'Looking for tomatoes',
    location: 'BS6 — Redland',
    category: 'Veg',
    type: 'Wanted',
    description: 'Making chutney this weekend — would love surplus tomatoes.'
  },
  {
    id: 4,
    title: 'Windfall apples',
    location: 'BS7 — Horfield',
    category: 'Fruit',
    type: 'Swap',
    description: 'Loads of apples going spare. Would swap for other fruit or veg.'
  },
  {
    id: 5,
    title: 'Hazel bean poles and pea sticks',
    location: 'BS7 — Bishopston',
    category: 'Garden',
    type: '£28',
    description: 'This season\'s crop. Sturdy and good for garden structures.'
  }
]

function App() {
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
        marginBottom: '24px',
        fontSize: '14px'
      }}>
        Connecting Bristol growers and makers
      </p>

      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          title={listing.title}
          location={listing.location}
          category={listing.category}
          type={listing.type}
          description={listing.description}
        />
      ))}
    </div>
  )
}

export default App
