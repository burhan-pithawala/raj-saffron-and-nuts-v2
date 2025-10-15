import React, { useState } from 'react'
import type { Product } from '../App'
import './AdminProducts.css'

interface AdminProductsProps {
  products: Product[]
  onAddProduct: (product: Omit<Product, 'id'>) => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (productId: number) => void
  onClose: () => void
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, onAddProduct, onEditProduct, onDeleteProduct, onClose }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'saffron' as 'saffron' | 'nuts',
    price: '',
    description: '',
    unit: '',
    image: ''
  })
  const [imageFileName, setImageFileName] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string>('')
  // const [imageMetadata, setImageMetadata] = useState<{ [key: string]: string }>({}) // Store filename for each base64 image

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFileName(file.name)
      // Create preview from the file
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.price || !formData.description || !formData.unit) {
      alert('Please fill in all required fields')
      return
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      unit: formData.unit,
      image: imagePreview || formData.image || '🎁', // Use base64 preview for immediate display
      imageFileName: imageFileName || undefined // Store filename separately
    }

    if (editingId !== null) {
      // Edit existing product
      onEditProduct({ ...productData, id: editingId })
      alert('Product updated successfully!')
      setEditingId(null)
    } else {
      // Add new product
      onAddProduct(productData)
      if (imageFileName) {
        alert(`Product added! Remember to upload "${imageFileName}" to public/products folder.`)
      } else {
        alert('Product added successfully!')
      }
    }
    
    // Reset form
    setFormData({
      name: '',
      category: 'saffron',
      price: '',
      description: '',
      unit: '',
      image: ''
    })
    setImageFileName('')
    setImagePreview('')
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      unit: product.unit,
      image: product.image
    })
    if (product.image.startsWith('/')) {
      setImageFileName(product.image.split('/').pop() || '')
    }
    setImagePreview('')
    setActiveTab('add')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      name: '',
      category: 'saffron',
      price: '',
      description: '',
      unit: '',
      image: ''
    })
    setImageFileName('')
    setImagePreview('')
  }

  const handleDelete = (productId: number, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      onDeleteProduct(productId)
    }
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>Product Management</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'add' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('add')}
          >
            Add Product
          </button>
          <button 
            className={activeTab === 'manage' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('manage')}
          >
            Manage Products ({products.length})
          </button>
        </div>

        {activeTab === 'add' ? (
          <form className="admin-form" onSubmit={handleSubmit}>
          {editingId !== null && (
            <div className="edit-banner">
              <span>✏️ Editing Product</span>
              <button type="button" onClick={handleCancelEdit} className="cancel-edit-btn">
                Cancel Edit
              </button>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Premium Kashmiri Saffron"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="saffron">Saffron</option>
              <option value="nuts">Nuts</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 899"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unit *</label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder="e.g., gram, 250g"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <p className="help-text">Upload a product image or leave empty for default icon</p>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={editingId ? handleCancelEdit : onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
        ) : (
          <div className="product-list">
            {products.length === 0 ? (
              <p className="empty-message">No products available</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-item-image">
                    {product.image.startsWith('/') || product.image.startsWith('data:') ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span>{product.image}</span>
                    )}
                  </div>
                  <div className="product-item-info">
                    <h3>{product.name}</h3>
                    <p className="product-item-category">{product.category}</p>
                    <p className="product-item-price">₹{product.price} / {product.unit}</p>
                  </div>
                  <div className="product-item-actions">
                    <button
                      className="edit-product-btn"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-product-btn"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
