import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Check backend URL.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="section-title mb-3">Our Organic Products</h2>
        <p className="section-text">
          Choose from our range of ghee, milk, paneer and farm-fresh butter.
        </p>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row mt-4">
          {!loading && !error && products.length === 0 && (
            <p>No products yet. Call POST /api/products/seed in backend.</p>
          )}

          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
