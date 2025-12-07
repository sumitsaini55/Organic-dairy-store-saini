import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { API_BASE_URL } from "../api";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        // take first 3 products as featured
        setFeatured(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load featured products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* Featured products on home */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h2 className="section-title mb-1">Featured Organic Products</h2>
              <p className="section-text mb-0">
                Handpicked bestsellers from our organic dairy range.
              </p>
            </div>
            <a href="/products" className="btn btn-hero-outline btn-sm">
              View all products
            </a>
          </div>

          {loading && <p>Loading featured products...</p>}

          {!loading && featured.length === 0 && (
            <p className="text-muted">
              No products available yet. Please seed products from backend.
            </p>
          )}

          <div className="row mt-3">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Existing "Why Organic" / about section */}
      <section id="about" className="py-5 section-gradient">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-md-6">
              <h2 className="section-title">Why Organic Dairy?</h2>
              <p className="section-text">
                Our cows are grass-fed, free-range and treated with love. No
                antibiotics, no artificial hormones. Just nature doing its
                magic, the way it should be.
              </p>
              <ul className="list-unstyled section-list">
                <li>🌿 A2 milk from desi cow breeds</li>
                <li>🚫 No preservatives or adulteration</li>
                <li>🧈 Traditional bilona method for ghee</li>
                <li>❄️ Cold chain maintained till your doorstep</li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="about-card animate-fade-up">
                <h4>Daily Morning Collection</h4>
                <p>
                  Milk is collected every morning from partner farms, processed
                  in small batches and dispatched within hours.
                </p>
                <div className="about-stats">
                  <div>
                    <h5>15+</h5>
                    <span>Partner Farms</span>
                  </div>
                  <div>
                    <h5>100%</h5>
                    <span>Traceable Batches</span>
                  </div>
                  <div>
                    <h5>48h</h5>
                    <span>Max Processing Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
