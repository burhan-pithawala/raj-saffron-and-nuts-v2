import React, { useState } from 'react'
import type { Product } from '../App'
import './ProductCatalog.css'

interface ProductCatalogProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'saffron' | 'nuts'>('all')

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <section className="product-catalog" id="products">
      <h2>Our Products</h2>
      
      <div className="category-filters">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''} 
          onClick={() => setSelectedCategory('all')}
        >
          All Products
        </button>
        <button 
          className={selectedCategory === 'saffron' ? 'active' : ''} 
          onClick={() => setSelectedCategory('saffron')}
        >
          Saffron
        </button>
        <button 
          className={selectedCategory === 'nuts' ? 'active' : ''} 
          onClick={() => setSelectedCategory('nuts')}
        >
          Nuts
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image.startsWith('/') || product.image.startsWith('data:') ? (
                <img src={product.image} alt={product.name} className="product-image-actual" />
              ) : (
                <div className="product-image-placeholder">{product.image}</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">₹{product.price} / {product.unit}</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductCatalog
