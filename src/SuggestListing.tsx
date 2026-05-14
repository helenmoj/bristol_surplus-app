import { useState } from 'react'

function SuggestListing() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    const response = await fetch('https://formspree.io/f/maqadaaq', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json'
      }
    })

    if (response.ok) {
      setSubmitted(true)
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="app">
        <div className="header">
          <h1>Bristol Larder</h1>
          <p>Connecting Bristol growers and makers</p>
        </div>
        <div className="main">
          <div style={{
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <h2 style={{
              color: '#1D9E75',
              marginBottom: '12px',
              fontSize: '20px'
            }}>
              Thank you!
            </h2>
            <p style={{
              color: '#3D3D3D',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              Your suggestion has been received. We'll review it and add it to Bristol Larder shortly.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                backgroundColor: '#1D9E75',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Back to listings
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Bristol Larder</h1>
        <p>Connecting Bristol growers and makers</p>
      </div>
      <div className="main">
        <div style={{ marginBottom: '24px', paddingTop: '8px' }}>
          <h2 style={{
            fontSize: '18px',
            color: '#1a1a1a',
            marginBottom: '6px'
          }}>
            Suggest a listing
          </h2>
     <div style={{ 
  marginBottom: '24px',
  paddingBottom: '16px',
  borderBottom: '1px solid #D0D0D0'
}}>
  <button
    onClick={() => window.location.href = '/'}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#1D9E75'
      e.currentTarget.style.color = 'white'
      e.currentTarget.style.borderColor = '#1D9E75'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'white'
      e.currentTarget.style.color = '#3D3D3D'
      e.currentTarget.style.borderColor = '#ddd'
    }}
    style={{
      backgroundColor: 'white',
      color: '#3D3D3D',
      border: '1px solid #ddd',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '13px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: 500
    }}
  >
    <span>←</span>
    <span>Back to listings</span>
  </button>
</div>

<p style={{
  fontSize: '13px',
  color: '#888',
  lineHeight: '1.5'
}}>
  Submit your listing here — surplus food, plants, seeds, garden equipment, or what you're looking for. I'll add it within 24 hours. Have a photo? Mention it in your description and I'll contact you for it. User accounts and 'Made from Surplus' gallery coming soon!
</p>

        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              What do you have?
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Surplus courgettes, windfall apples"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                color: '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              Your location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. BS7 — Bishopston"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                color: '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              Category
            </label>
            <select
              name="category"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#333'
              }}
            >
              <option>Veg</option>
              <option>Fruit</option>
              <option>Preserves</option>
              <option>Garden</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              Free, swap, wanted or priced?
            </label>
            <select
              name="type"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#333'
              }}
            >
              <option>Free</option>
              <option>Swap</option>
              <option>Wanted</option>
              <option>Priced</option>
            </select>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              Tell us more
            </label>
            <textarea
              name="description"
              required
              placeholder="How much do you have? Any collection details? What would you swap for?"
              rows={4}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical' as const,
                fontFamily: 'inherit',
                color: '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
  <label style={{
    fontSize: '13px',
    color: '#444',
    display: 'block',
    marginBottom: '6px'
  }}>
    Your contact details
  </label>
  <input
    type="text"
    name="contact"
    placeholder="Email or phone number for interested people"
    style={{
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      outline: 'none',
      color: '#333'
    }}
  />
</div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '13px',
              color: '#444',
              display: 'block',
              marginBottom: '6px'
            }}>
              Your email address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="So we can let you know when it's live"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                outline: 'none',
                color: '#333'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#aaa' : '#1D9E75',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Sending...' : 'Suggest this listing'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SuggestListing