import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i._id === product._id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    // hide message after 1.2s
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="product-card h-100 animate-fade-up">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <span className="product-badge">100% Organic</span>
        </div>
        <div className="p-3">
          <h5 className="product-title">{product.name}</h5>
          <p className="product-desc">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="product-price">₹{product.price}</span>
            <button
              className="btn btn-sm btn-hero-primary"
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          </div>

          {/* Small feedback text */}
          {added && (
            <div className="added-note mt-2">
              ✅ Added to cart
              {quantityInCart > 0 && (
                <span className="ms-1">(Qty in cart: {quantityInCart})</span>
              )}
            </div>
          )}

          {product.category && (
            <div className="mt-2 small text-muted">
              Category: {product.category}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
