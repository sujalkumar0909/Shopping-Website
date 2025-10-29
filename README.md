# 🛍️ Shopping Website (React + Vite + Context API)

This is a modern e-commerce frontend project built using React + Vite, featuring:

- Beautiful product listing with category filters & search
- Animated background with floating clouds ☁️
- Automatic product slideshow (carousel)
- Responsive design
- Context-based global cart state

## 🚀 Features
✅ **Product List Page** – fetches data from Fake Store API  
✅ **Search & Filter** – search products and filter by category  
✅ **Slideshow Carousel** – top banner with auto-scrolling featured products  
✅ **Animated UI** – smooth transitions with Framer Motion  
✅ **Cart Management** – add/remove items globally with Context API  
✅ **Responsive** – mobile-friendly grid layout  
✅ **Clean UI** – elegant styling with modern gradients  

<!-- ## 🗂️ Folder Structure

SHOPPING-WEBSITE/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Loader.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductList.jsx
│   ├── App.jsx
│   └── main.jsx -->


## ⚙️ Setup Instructions
### 1️⃣ Install Dependencies
Run the following command inside the project directory:
```bash
npm install

2️⃣ Start Development Server
npm run dev

Then open your browser and visit:
👉 http://localhost:5173/

🧩 Main Files Explained
🧱 App.jsx
Handles routing between pages using react-router-dom:

<Route path="/" element={<ProductList />} />
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/cart" element={<Cart />} />
<Route path="/login" element={<Login />} />


🛒 CartContext.jsx
Uses React Context API to manage global cart data:

Add to cart

Remove from cart

Persist cart state between pages

🛍️ ProductList.jsx
Displays:

Search bar

Category filter dropdown

Animated product grid

Slideshow at the top (auto-moves every few seconds, full width)

Key libraries used:

framer-motion → for smooth fade & float animations

react-router-dom → for navigation

fakestoreapi.com → for mock product data

🧭 Header.jsx
Contains navigation links:

🏠 Home

🛒 Cart

🔐 Login

You can enhance it with icons, hover effects, and cart item count badges.

⏳ Loader.jsx
A stylish loader shown while fetching data.

🎨 Styling & Animations
Cloud-like floating background (@keyframes floatClouds)

Card pop and fade-in effects for smooth transitions

Gradient background with soft tones

🌐 API Used
All product data is fetched from Fake Store API:
🔗 https://fakestoreapi.com

Endpoints used:

/products → Get all products

/products/categories → Get all categories

/products/:id → Get single product

🧠 Technologies Used
Category	Technology
Frontend Framework	React + Vite
State Management	React Context API
Animations	Framer Motion
Styling	CSS3 (custom styles)
Routing	React Router DOM
Data	Fake Store API


🖼️ Example Preview (UI Flow)
┌──────────────────────────────────────────┐
│ Header                                   │
├──────────────────────────────────────────┤
│ Slideshow (auto-moving products)         │
├──────────────────────────────────────────┤
│ Search + Category Filter                 │
├──────────────────────────────────────────┤
│ Product Grid (cards)                     │
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
