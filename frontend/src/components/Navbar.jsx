import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onCartClick }) => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={handleNavClick}
        >
          <div className="logo-circle me-2">OD</div>
          <span className="fw-bold">OrganicDairy</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen((p) => !p)}
        >
          <span className="navbar-toggler-icon-custom" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {/* Home */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={handleNavClick}>
                Home 🏠
              </NavLink>
            </li>

            {/* Products */}
            <li className="nav-item">
              <NavLink
                to="/products"
                className="nav-link"
                onClick={handleNavClick}
              >
                Products 
              </NavLink>
            </li>

            {/* Admin link only for admin user */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/admin/orders"
                  className="nav-link"
                  onClick={handleNavClick}
                >
                  Admin ⚙️
                </NavLink>
              </li>
            )}

            {/* Cart button */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                className="btn btn-cart position-relative"
                onClick={() => {
                  onCartClick();
                  handleNavClick();
                }}
              >
                Cart 🛒
                {itemCount > 0 && (
                  <span className="badge rounded-pill cart-badge">
                    {itemCount}
                  </span>
                )}
              </button>
            </li>

            {/* Auth buttons */}
            {!user && (
              <>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <NavLink
                    to="/login"
                    className="btn btn-hero-outline btn-sm"
                    onClick={handleNavClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <NavLink
                    to="/register"
                    className="btn btn-hero-primary btn-sm"
                    onClick={handleNavClick}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <span className="nav-link small">
                    Hi,&nbsp;<strong>{user.name || "User"}</strong>
                  </span>
                </li>
                <li className="nav-item mt-2 mt-lg-0">
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => {
                      logout();
                      handleNavClick();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
