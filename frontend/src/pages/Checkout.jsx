import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Load saved address for this user (if any)
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`address_${user.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          ...parsed
        }));
      } catch {
        // ignore
      }
    } else {
      setForm((prev) => ({
        ...prev,
        customerName: user.name || "",
        email: prev.email || ""
      }));
    }
  }, [user]);

  // Save address when form changes
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`address_${user.id}`, JSON.stringify(form));
  }, [form, user]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setStatus({ type: "error", message: "Cart is empty." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      const payload = {
        ...form,
        totalAmount,
        userId: user?.id,
        items: items.map((i) => ({
          product: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        }))
      };

      await axios.post(`${API_BASE_URL}/api/orders`, payload);

      setStatus({
        type: "success",
        message: "Order placed successfully! We will contact you soon."
      });

      clearCart();

      setForm((prev) => ({
        ...prev,
        phone: "",
        city: prev.city,
        pincode: prev.pincode
      }));
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Order failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="section-title mb-3">Checkout</h2>
        <p className="section-text">
          Fill your delivery details and confirm your organic dairy order.
        </p>

        <div className="row gy-4 mt-3">
          <div className="col-md-6">
            <div className="checkout-card">
              <h5 className="mb-3">Delivery Details</h5>

              {status.message && (
                <div
                  className={`alert ${
                    status.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-hero-primary w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="checkout-card">
              <h5 className="mb-3">Order Summary</h5>
              {items.length === 0 ? (
                <p className="text-muted">
                  Your cart is empty. Add some organic love 💚
                </p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {items.map((item) => (
                      <li
                        key={item._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <div>{item.name}</div>
                          <small className="text-muted">
                            Qty: {item.quantity} × ₹{item.price}
                          </small>
                        </div>
                        <strong>₹{item.price * item.quantity}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between">
                    <span>Total</span>
                    <strong>₹{totalAmount}</strong>
                  </div>
                  <p className="mt-3 small text-muted">
                    Cash on delivery / UPI on delivery. Online payment
                    integration can be added later.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
