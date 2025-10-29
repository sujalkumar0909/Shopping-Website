import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 50px",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        animation: "fadeSlide 0.7s ease-out",
      }}
    >
      <style>
        {`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logo {
          font-size: 26px;
          font-weight: 700;
          color: #4B3EF0;
          letter-spacing: 0.5px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
        }
        .logo:hover {
          transform: scale(1.05);
        }

        nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          color: #222;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #4B3EF0, #6E45E2);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #4B3EF0;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .logout-btn {
          background: linear-gradient(90deg, #6E45E2, #4B3EF0);
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(78, 62, 240, 0.3);
        }

        @media (max-width: 768px) {
          header {
            padding: 12px 25px;
          }
          .logo {
            font-size: 22px;
          }
          .nav-link {
            font-size: 15px;
          }
          nav {
            gap: 15px;
          }
        }
      `}
      </style>

      <Link to="/" className="logo">
        🛍️ <span>ShopEasy</span>
      </Link>

      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/cart" className="nav-link">
          Cart ({cartItems.length})
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
