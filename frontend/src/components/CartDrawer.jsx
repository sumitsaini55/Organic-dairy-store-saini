import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, totalAmount } = useCart();

  return (
    <>
      <div
        className={`cart-drawer-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-drawer-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Your Cart</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-info">
                  <h6>{item.name}</h6>
                  <p className="mb-1">₹{item.price}</p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-link text-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="d-flex justify-content-between mb-2">
            <span>Total:</span>
            <strong>₹{totalAmount}</strong>
          </div>
          <Link
            to="/checkout"
            className="btn w-100 btn-hero-primary"
            onClick={onClose}
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
