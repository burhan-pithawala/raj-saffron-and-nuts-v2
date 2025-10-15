import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCatalog from './components/ProductCatalog'
import Cart from './components/Cart'
import Footer from './components/Footer'
import AdminProducts from './components/AdminProducts'
import { products as initialProducts } from './data/products'

export interface Product {
  id: number
  name: string
  category: 'saffron' | 'nuts'
  price: number
  image: string
  description: string
  unit: string
  imageFileName?: string // Store original filename for export
}

export interface CartItem extends Product {
  quantity: number
}

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ))
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    const productWithId: Product = {
      ...newProduct,
      id: newId
    }
    setProducts([...products, productWithId])
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
  }

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const handleExportProducts = () => {
    // Convert base64 images to filename paths for export
    const productsForExport = products.map(product => {
      const exportProduct: any = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        unit: product.unit,
        image: product.image
      }
      
      // If image is base64 and we have a filename, use the filename path
      if (product.image.startsWith('data:') && product.imageFileName) {
        exportProduct.image = `/products/${product.imageFileName}`
      }
      
      return exportProduct
    })

    const fileContent = `import type { Product } from '../App'

export const products: Product[] = ${JSON.stringify(productsForExport, null, 2)}
`
    const blob = new Blob([fileContent], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'products.ts'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <div className="admin-buttons">
        <button 
          className="admin-button"
          onClick={() => setIsAdminOpen(true)}
        >
          + Add Product
        </button>
        <button 
          className="export-button"
          onClick={handleExportProducts}
          title="Export products to file"
        >
          📥 Export Products
        </button>
      </div>
      <ProductCatalog 
        products={products}
        onAddToCart={addToCart} 
      />
      <Footer />
      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={getTotalPrice()}
      />
      {isAdminOpen && (
        <AdminProducts
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  )
}

export default App
