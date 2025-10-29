import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
      const categoryData = await categoryRes.json();
      setCategories(["all", ...categoryData]);

      const productRes = await fetch("https://fakestoreapi.com/products");
      const productData = await productRes.json();
      setProducts(productData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(135deg, #f0f4ff, #e6e9ff, #f5f7ff)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
        @keyframes floatClouds {
          0% { background-position: 0 0, 100px 50px, 200px 0; }
          50% { background-position: 100px 25px, 0 0, 300px 50px; }
          100% { background-position: 0 0, 100px 50px, 200px 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 70%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.5) 0%, transparent 80%),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,0.6) 0%, transparent 70%)
          `,
          backgroundSize: "400px 400px",
          animation: "floatClouds 12s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <motion.div
        className="product-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          className="filters"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
            animation: "fadeIn 0.8s ease",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              minWidth: "240px",
              fontSize: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {!loading && products.length > 0 && (
          <div
            style={{
              position: "relative",
              height: "400px",
              overflow: "hidden",
              width: "100%",
              marginBottom: "50px",
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : -50,
                }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "40px",
                  padding: "20px",
                  opacity: index === currentIndex ? 1 : 0,
                  pointerEvents: index === currentIndex ? "auto" : "none",
                  background:
                    "linear-gradient(120deg, #ffffff, #eef0ff, #f8f9ff)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "260px",
                    width: "260px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
                <div style={{ maxWidth: "450px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    style={{
                      color: "#6E45E2",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      marginTop: "10px",
                      display: "inline-block",
                      background: "#6E45E2",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "0.3s",
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Controls */}
            <button
              onClick={prevSlide}
              style={{
                position: "absolute",
                top: "50%",
                left: "25px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                border: "none",
                color: "white",
                fontSize: "28px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
              }}
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: "absolute",
                top: "50%",
                right: "25px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                border: "none",
                color: "white",
                fontSize: "28px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
              }}
            >
              ›
            </button>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "25px",
              animation: "cardPop 0.8s ease",
              padding: "0 20px",
            }}
          >
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  textDecoration: "none",
                  color: "#333",
                  transition: "0.3s",
                  animation: "fadeIn 0.6s ease",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: "15px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    height: "40px",
                    overflow: "hidden",
                  }}
                >
                  {product.title}
                </h4>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#6E45E2",
                    fontSize: "17px",
                  }}
                >
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
