import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        background:
          "linear-gradient(270deg, #74ABE2, #5563DE, #6E45E2, #74ABE2)",
        backgroundSize: "800% 800%",
        animation: "bgAnimation 15s ease infinite",
      }}
    >
      <style>
        {`
        @keyframes bgAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatClouds {
          0% { transform: translateX(-200px); opacity: 0.9; }
          50% { opacity: 1; }
          100% { transform: translateX(120vw); opacity: 0.9; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cloud {
          position: absolute;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.9;
        }
        `}
      </style>

      <div
        className="cloud"
        style={{
          width: "180px",
          height: "80px",
          top: "15%",
          left: "-200px",
          animation: "floatClouds 80s linear infinite",
        }}
      ></div>
      <div
        className="cloud"
        style={{
          width: "250px",
          height: "100px",
          top: "40%",
          left: "-250px",
          animation: "floatClouds 120s linear infinite 10s",
        }}
      ></div>
      <div
        className="cloud"
        style={{
          width: "200px",
          height: "90px",
          top: "70%",
          left: "-220px",
          animation: "floatClouds 100s linear infinite 5s",
        }}
      ></div>

      <div
        style={{
          position: "relative",
          width: "350px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          padding: "40px 30px",
          textAlign: "center",
          animation: "fadeSlide 1s ease",
          zIndex: 2,
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login to Shop</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #6E45E2")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #6E45E2")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: isSubmitting
                ? "#a8a8a8"
                : "linear-gradient(90deg, #6E45E2, #5563DE)",
              color: "white",
              fontSize: "16px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              if (!isSubmitting)
                e.target.style.background = "linear-gradient(90deg,#5563DE,#6E45E2)";
            }}
            onMouseOut={(e) => {
              if (!isSubmitting)
                e.target.style.background = "linear-gradient(90deg,#6E45E2,#5563DE)";
            }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
