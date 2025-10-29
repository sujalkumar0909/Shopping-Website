import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f4ff, #e1e7ff, #f5f7ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
        animation: "fadePage 0.8s ease",
      }}
    >
      <style>
        {`
        @keyframes fadePage {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imagePop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes textSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes addMsgFade {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        `}
      </style>

      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: "flex-start",
          marginLeft: "20px",
          padding: "8px 16px",
          background: "linear-gradient(90deg,#6E45E2,#5563DE)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
          fontSize: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        onMouseOver={(e) =>
          (e.target.style.background = "linear-gradient(90deg,#5563DE,#6E45E2)")
        }
        onMouseOut={(e) =>
          (e.target.style.background = "linear-gradient(90deg,#6E45E2,#5563DE)")
        }
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          padding: "40px",
          maxWidth: "900px",
          width: "100%",
          animation: "fadePage 0.8s ease",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            animation: "imagePop 1s ease",
            borderRadius: "15px",
          }}
        />

        <div
          style={{
            flex: 1,
            animation: "textSlide 1s ease",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              color: "#333",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            {product.title}
          </h2>
          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              fontSize: "15px",
              marginBottom: "20px",
              textAlign: "justify",
            }}
          >
            {product.description}
          </p>
          <h3
            style={{
              fontSize: "22px",
              color: "#6E45E2",
              marginBottom: "25px",
            }}
          >
            ${product.price.toFixed(2)}
          </h3>
          <button
            onClick={handleAdd}
            style={{
              background: "linear-gradient(90deg,#6E45E2,#5563DE)",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg,#5563DE,#6E45E2)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg,#6E45E2,#5563DE)")
            }
          >
            Add to Cart
          </button>

          {added && (
            <span
              style={{
                display: "block",
                marginTop: "15px",
                color: "green",
                fontWeight: "600",
                animation: "addMsgFade 2s ease forwards",
              }}
            >
              ✔️ Added to cart
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
