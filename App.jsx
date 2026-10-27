import React, { useState, useMemo, useEffect } from "react";

const products = [
  { id: 1, name: "Fresh Apples", price: 120, unit: "1 kg", category: "Fruits", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85", emoji: "🍎" },
  { id: 2, name: "Bananas", price: 50, unit: "1 dozen", category: "Fruits", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85", emoji: "🍌" },
  { id: 3, name: "Fresh Tomatoes", price: 35, unit: "1 kg", category: "Vegetables", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85", emoji: "🍅" },
  { id: 4, name: "Fresh Milk", price: 32, unit: "500 ml", category: "Dairy", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85", emoji: "🥛" },
  { id: 5, name: "Broccoli", price: 60, unit: "500 g", category: "Vegetables", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=85", emoji: "🥦" },
  { id: 6, name: "Fresh Bread", price: 40, unit: "1 loaf", category: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85", emoji: "🍞" },
  { id: 7, name: "Oranges", price: 80, unit: "1 kg", category: "Fruits", image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=700&q=85", emoji: "🍊" },
  { id: 8, name: "Carrots", price: 45, unit: "1 kg", category: "Vegetables", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=85", emoji: "🥕" },
];

const categoryItems = [
  { name: "Fruits", emoji: "🍎", caption: "Fresh & juicy", tone: "mint" },
  { name: "Vegetables", emoji: "🥦", caption: "Farm fresh", tone: "green" },
  { name: "Dairy", emoji: "🥛", caption: "Pure & healthy", tone: "blue" },
  { name: "Bakery", emoji: "🍞", caption: "Freshly baked", tone: "peach" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase().trim());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [search, selectedCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to cart`);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function chooseCategory(category) {
    setSelectedCategory(category);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="FreshBasket home">
          <span className="brand-mark">❧</span>
          <span><strong>FreshBasket</strong><small>Freshness at Your Doorstep</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="active" href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>
        <label className="header-search">
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(e) => { setSearch(e.target.value); document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }} placeholder="Search for products..." aria-label="Search for products" />
          <span className="search-icon">⌕</span>
        </label>
        <button className="header-cart" onClick={() => setCartOpen(!cartOpen)} aria-expanded={cartOpen}>
          <span className="cart-icon">🛒</span><span className="cart-count">{cartCount}</span>
          <span className="cart-button-label">My Cart ({cartCount})</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="fresh-pill"><span>❧</span> 100% Fresh <i>•</i> Organic <i>•</i> Local</div>
            <h1>Fresh Groceries,<br /><span>Delivered With Love.</span></h1>
            <p>Shop fresh fruits, vegetables and everyday essentials from the comfort of your home.</p>
            <a className="primary-button" href="#products">🛒 <span>Shop Now</span> <b>→</b></a>
            <div className="hero-benefits">
              <div><span className="benefit-icon">❧</span><p><strong>Fresh & Organic</strong><small>100% Natural</small></p></div>
              <div><span className="benefit-icon">🚚</span><p><strong>Fast Delivery</strong><small>Within 24 Hours</small></p></div>
              <div><span className="benefit-icon">✓</span><p><strong>Secure Payment</strong><small>100% Safe</small></p></div>
            </div>
          </div>
          <div className="hero-photo" role="img" aria-label="Basket of fresh vegetables and fruit">
            <div className="photo-note">Good Food,<br /><em>Good Mood</em><span>♡</span></div>
          </div>
        </section>

        <div className="content-layout">
          <div className="store-content">
            <section className="section categories-section" id="categories">
              <div className="section-heading">
                <div className="heading-symbol">❧</div>
                <div><h2>Shop by Category</h2><p>Find everything you need in one place</p></div>
                <button className="text-link" onClick={() => chooseCategory("All")}>View All Categories <span>→</span></button>
              </div>
              <div className="category-grid">
                {categoryItems.map((category) => (
                  <button className={`category-card ${category.tone} ${selectedCategory === category.name ? "selected" : ""}`} key={category.name} onClick={() => chooseCategory(category.name)}>
                    <span className="category-emoji">{category.emoji}</span>
                    <span className="category-text"><strong>{category.name}</strong><small>{category.caption}</small></span>
                    <span className="category-arrow">→</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="section products-section" id="products">
              <div className="section-heading">
                <div className="heading-symbol sparkle">✣</div>
                <div><h2>Popular Products</h2><p>Best quality products at great prices</p></div>
              </div>
              <div className="product-controls">
                <div className="filter-chips" aria-label="Filter products by category">
                  {["All", "Fruits", "Vegetables", "Dairy", "Bakery"].map((category) => (
                    <button key={category} className={selectedCategory === category ? "chip active-chip" : "chip"} onClick={() => setSelectedCategory(category)}>{category}</button>
                  ))}
                </div>
                <label className="mobile-search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search groceries..." /></label>
              </div>
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "grid"; }} />
                      <span className="image-fallback">{product.emoji}</span>
                      <span className="product-badge">Fresh</span>
                    </div>
                    <div className="product-info">
                      <small className="product-category">{product.category}</small>
                      <h3>{product.name}</h3>
                      <p className="product-unit">{product.unit}</p>
                      <div className="product-bottom"><strong>₹{product.price}</strong><button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>＋ Add to Cart</button></div>
                    </div>
                  </article>
                ))}
              </div>
              {filteredProducts.length === 0 && <div className="empty-products"><span>🥬</span><h3>No products found</h3><p>Try another search or category.</p><button onClick={() => { setSearch(""); setSelectedCategory("All"); }}>Clear filters</button></div>}
            </section>

            <section className="trust-strip" id="about">
              <div><span>🌿</span><p><strong>Freshness Guaranteed</strong><small>Handpicked with care</small></p></div>
              <div><span>🚚</span><p><strong>Quick Delivery</strong><small>Right to your doorstep</small></p></div>
              <div><span>♡</span><p><strong>Made for Your Family</strong><small>Quality you can trust</small></p></div>
            </section>
          </div>

          <aside className={`cart-panel ${cartOpen ? "cart-panel-open" : ""}`} id="cart">
            <div className="cart-panel-heading"><div><span>♧</span><h2>Your Cart <b>({cartCount})</b></h2></div><button onClick={() => setCartOpen(!cartOpen)} aria-label="Toggle cart">{cartOpen ? "⌄" : "⌃"}</button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><span>🛒</span><h3>Your cart is empty</h3><p>Add some fresh groceries to get started.</p><button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Browse Products</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <div className="cart-item-details"><strong>{item.name}</strong><small>₹{item.price} / {item.unit}</small><div className="quantity-controls"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>＋</button></div></div>
                      <div className="cart-item-end"><strong>₹{item.price * item.quantity}</strong><button className="remove-item" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></div>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>Total</span><strong>₹{cartTotal}</strong></div>
                <button className="checkout-button" onClick={() => setNotice("Checkout is the next feature to add!")}>View Cart <span>→</span></button>
                <p className="delivery-footnote">Delivery charges, if any, are calculated at checkout.</p>
              </>
            )}
          </aside>
        </div>
      </main>

      <footer className="site-footer"><span>🌿</span><em>Fresh Choices</em><b>♡</b><em>Healthier You</em><span>🌿</span></footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}

export default App;
