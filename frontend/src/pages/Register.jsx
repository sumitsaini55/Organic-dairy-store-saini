import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      setStatus({
        type: "success",
        message: "Registered successfully. You can now login."
      });
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="checkout-card" style={{ maxWidth: 420, width: "100%" }}>
          <h3 className="mb-3 section-title">Create Account</h3>
          <p className="section-text">
            Sign up to place orders faster and access admin (for admin users).
          </p>

          {status.message && (
            <div
              className={`alert ${
                status.type === "success" ? "alert-success" : "alert-danger"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
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
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-hero-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="small mt-3 mb-0 text-muted">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
