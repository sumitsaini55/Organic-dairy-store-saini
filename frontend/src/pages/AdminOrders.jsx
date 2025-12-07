import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!token) {
      setError("Please login as admin to view orders.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to load orders. Check login.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString();
  };

  if (!token) {
    return (
      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-2">Admin • Orders</h2>
          <p className="text-danger">
            You must be logged in as admin to view orders.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <h2 className="section-title mb-1">Admin • Orders</h2>
            <p className="section-text mb-0">
              View all customer orders placed from the Organic Dairy store.
            </p>
          </div>
          <button className="btn btn-hero-outline" onClick={fetchOrders}>
            🔄 Refresh
          </button>
        </div>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-muted mt-3">
            No orders yet. Place one from checkout.
          </p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="table-responsive mt-3">
            <table className="table table-sm align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="fw-semibold">
                        {order.customerName}
                      </div>
                      <div className="small text-muted">
                        {order._id.slice(-6)}
                      </div>
                    </td>
                    <td>
                      <div className="small">{order.email}</div>
                      {order.phone && (
                        <div className="small text-muted">
                          {order.phone}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="small">{order.address}</div>
                      <div className="small text-muted">
                        {order.city} {order.pincode}
                      </div>
                    </td>
                    <td style={{ maxWidth: 250 }}>
                      <ul className="small mb-0 ps-3">
                        {order.items?.map((item) => (
                          <li key={item._id || item.name}>
                            {item.name} × {item.quantity} (₹{item.price})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="fw-semibold">₹{order.totalAmount}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          order.status === "pending"
                            ? "text-bg-warning"
                            : "text-bg-success"
                        }`}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
