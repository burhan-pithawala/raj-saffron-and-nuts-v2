import React from 'react'
import type { CartItem } from '../App'
import './Cart.css'

interface CartProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
  totalPrice: number
}

const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  items, 
  onClose, 
  onUpdateQuantity, 
  onRemove, 
  totalPrice 
}) => {
  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }

    // Create order message
    let message = '🛒 *Order from Raj Saffron & Nuts*\n\n'
    message += '*Order Details:*\n'
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Quantity: ${item.quantity} ${item.unit}\n`
      message += `   Price: ₹${item.price} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}\n\n`
    })
    
    message += `*Total Amount: ₹${totalPrice.toFixed(2)}*\n\n`
    message += 'Please confirm my order. Thank you!'

    // WhatsApp number - Update this with your actual WhatsApp business number
    const phoneNumber = '+971502978626' // Replace with your WhatsApp number (with country code, no + or spaces)
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image.startsWith('/') || item.image.startsWith('data:') ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>{item.image}</span>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">₹{item.price} / {item.unit}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">₹{totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                📱 Checkout via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
