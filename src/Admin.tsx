import { useState } from 'react'
import { supabase } from './supabase'
import imageCompression from 'browser-image-compression'

function Admin() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Veg')
  const [type, setType] = useState('Free')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [contact, setContact] = useState('')
  const [expiryDays, setExpiryDays] = useState('30')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [compressionMessage, setCompressionMessage] = useState('')

  const categories = ['Veg', 'Fruit', 'Preserves', 'Garden', 'Other']
  const types = ['Free', 'Swap', 'Wanted', '£']

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const originalSize = (file.size / 1024 / 1024).toFixed(2)
      
      // Check file size first
      if (file.size > 5000000) { // 5MB max before compression
        setCompressionMessage(`Large file detected (${originalSize}MB), compressing...`)
      }
      
      try {
        // Compress the image
        const options = {
          maxSizeMB: 1,           // Max 1MB after compression
          maxWidthOrHeight: 1920, // Max width/height 1920px
          useWebWorker: true
        }
        
        const compressedFile = await imageCompression(file, options)
        
        // Show compression result
        const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2)
        console.log(`✅ Compressed: ${originalSize}MB → ${compressedSize}MB`)
        setCompressionMessage(`✅ Compressed from ${originalSize}MB to ${compressedSize}MB`)
        
        setImageFile(compressedFile)
      } catch (error) {
        console.error('Compression error:', error)
        setCompressionMessage('Could not compress, using original file')
        setImageFile(file)
      }
    }
  }

  async function handleSubmit() {
    if (!title || !location || !description) {
      alert('Please fill in all fields')
      return
    }

    setUploading(true)

    try {
      let imageUrl = null

      // Upload image if one was selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(fileName, imageFile)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          alert('Failed to upload image')
          setUploading(false)
          return
        }

        if (uploadData) {
          const { data: urlData } = supabase.storage
            .from('listing-images')
            .getPublicUrl(uploadData.path)
          
          imageUrl = urlData.publicUrl
        }
      }

      // Calculate expiry date
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays))

      // Insert listing with image URL
      const { error } = await supabase
        .from('listings')
        .insert([{
          title,
          location,
          category,
          type,
          description,
          contact,
          image_url: imageUrl,
          created_at: new Date().toISOString(),
          expires_at: expiryDate.toISOString()
        }])

      if (error) {
        console.error('Error adding listing:', error)
        alert('Something went wrong — check the console')
      } else {
        setSubmitted(true)
        setTitle('')
        setLocation('')
        setCategory('Veg')
        setType('Free')
        setDescription('')
        setContact('')
        setImageFile(null)
        setCompressionMessage('')
        
        // Clear success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Something went wrong')
    }

    setUploading(false)
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#1D9E75', marginBottom: '4px' }}>
        Bristol Larder
      </h1>

      <p style={{ color: '#888', marginBottom: '24px', fontSize: '14px' }}>
        Admin — add a new listing
      </p>

      {submitted && (
        <div style={{
          backgroundColor: '#E1F5EE',
          border: '1px solid #1D9E75',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          color: '#0F6E56',
          fontSize: '14px'
        }}>
          ✅ Listing added successfully!
        </div>
      )}

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Surplus courgettes"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            color: '#333'
          }}
        />
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. BS7 — Bishopston"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            color: '#333'
          }}
        />
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            backgroundColor: 'white',
            color: '#333'
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            backgroundColor: 'white',
            color: '#333'
          }}
        >
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you have, how much, and any collection details..."
          rows={4}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
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
          Contact details
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="e.g. email address or phone number"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            color: '#333'
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '13px',
          color: '#444'
        }}>
          Photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            display: 'block',
            fontSize: '14px'
          }}
        />
        {imageFile && (
          <div>
            <p style={{ 
              marginTop: '8px', 
              fontSize: '13px', 
              color: '#666',
              fontWeight: 500
            }}>
              Selected: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)}MB)
            </p>
            {compressionMessage && (
              <p style={{
                marginTop: '6px',
                fontSize: '12px',
                color: compressionMessage.includes('✅') ? '#0F6E56' : '#FF9800',
                fontStyle: 'italic'
              }}>
                {compressionMessage}
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '13px', color: '#444', display: 'block', marginBottom: '6px' }}>
          How long should this listing stay up?
        </label>
        <select
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box' as const,
            outline: 'none',
            backgroundColor: 'white',
            color: '#333'
          }}
        >
          <option value="7">7 days — fresh produce</option>
          <option value="14">14 days — general food</option>
          <option value="30">30 days — garden items</option>
          <option value="90">90 days — tools and equipment</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={uploading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: uploading ? '#aaa' : '#1D9E75',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 500,
          cursor: uploading ? 'not-allowed' : 'pointer'
        }}
      >
        {uploading ? 'Uploading...' : 'Add listing'}
      </button>
    </div>
  )
}

export default Admin
