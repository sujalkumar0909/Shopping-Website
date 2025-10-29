import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({ total: 0, timestamp: "" });

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const totalBeforeClear = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const now = new Date().toLocaleString();

    // Store before clearing
    setReceiptData({ total: totalBeforeClear, timestamp: now });

    clearCart();
    setShowReceipt(true);

    setTimeout(() => setShowReceipt(false), 5000);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif",
        position: "relative",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No items in cart.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "#f9f9f9",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 6px 0" }}>{item.title}</h4>
                  <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                    ${item.price.toFixed(2)}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      style={{
                        width: "60px",
                        padding: "4px 6px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "#ff5555",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Total: ${total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              style={{
                background: "#4CAF50",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#45a049")}
              onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {/* ✅ Centered Receipt Popup */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                background: "#fff",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                padding: "30px 40px",
                textAlign: "center",
                maxWidth: "350px",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <div
                  style={{
                    fontSize: "80px",
                    color: "#4CAF50",
                    marginBottom: "10px",
                  }}
                >
                  ✅
                </div>
              </motion.div>
              <h3 style={{ margin: "10px 0", color: "#333" }}>
                Order Placed Successfully!
              </h3>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Total:</strong> ${receiptData.total.toFixed(2)}
              </p>
              <p style={{ margin: "5px 0", color: "#777" }}>
                <strong>Timestamp:</strong> {receiptData.timestamp}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;
