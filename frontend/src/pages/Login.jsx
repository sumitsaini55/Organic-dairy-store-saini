import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);

      // save token + user in context + localStorage
      login(res.data);

      setStatus({ type: "success", message: "Login successful!" });

      // if user came from checkout, go back there
      const from =
        location.state?.from?.pathname ||
        (res.data.user.role === "admin" ? "/admin/orders" : "/");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Login failed. Check email and password.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="checkout-card" style={{ maxWidth: 420, width: "100%" }}>
          <h3 className="mb-3 section-title">Login</h3>
          <p className="section-text">
            Please login to continue to checkout or admin dashboard.
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="small mt-3 mb-0 text-muted">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
