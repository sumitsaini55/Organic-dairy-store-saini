import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <div className="hero-content animate-fade-up">
              <span className="badge hero-badge mb-3">
                100% Organic • Farm to Home
              </span>
              <h1 className="hero-title">
                Pure <span className="text-highlight">Desi Ghee</span> &
                Organic Dairy
              </h1>
              <p className="hero-subtitle">
                Freshly sourced from grass-fed cows, crafted in small batches.
                No hormones, no chemicals—only pure goodness.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="btn btn-hero-primary">
                  Shop Now
                </Link>
                <a href="#about" className="btn btn-hero-outline">
                  Why Organic?
                </a>
              </div>
              <div className="hero-stats mt-4">
                <div>
                  <h4>5k+</h4>
                  <p>Happy Customers</p>
                </div>
                <div>
                  <h4>24h</h4>
                  <p>From Farm to Door</p>
                </div>
                <div>
                  <h4>0%</h4>
                  <p>Preservatives</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-visual animate-float">
              <div className="hero-circle" />
              <img
                src="https://t4.ftcdn.net/jpg/13/15/19/43/360_F_1315194377_Ro8c5tjMXYc3oEXUJ6zgyeIENDkdQyJX.jpg"
                alt="Organic ghee"
                className="hero-image-main"
              />
              <div className="hero-card hero-card-top">
                💚 A2 Desi Cow Ghee
              </div>
              <div className="hero-card hero-card-bottom">
                🚚 Free delivery above ₹999
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
