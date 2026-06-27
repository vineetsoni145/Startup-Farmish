import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/products.api";
import { PRODUCT_CATEGORIES } from "../data/catalog";
import ProductCard from "../components/ProductCard";
import { usePageMetadata } from "../hooks/usePageMetadata";

function Shop() {
  usePageMetadata(
    "Shop",
    "Shop organic vegetables, fruits, grains, and pulses with filters and sorting.",
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "relevance",
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc",
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSortBy(searchParams.get("sortBy") || "relevance");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetchProducts({
        category,
        query,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
      });
      if (!cancelled && res.ok) setItems(res.data);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [category, query, minPrice, maxPrice, sortBy, sortOrder]);

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setSearchParams(next);
  };

  const applyFilterSettings = (event) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query.trim()) next.set("q", query.trim());
    else next.delete("q");

    if (minPrice.trim()) next.set("minPrice", minPrice.trim());
    else next.delete("minPrice");

    if (maxPrice.trim()) next.set("maxPrice", maxPrice.trim());
    else next.delete("maxPrice");

    if (sortBy && sortBy !== "relevance") next.set("sortBy", sortBy);
    else next.delete("sortBy");

    if (sortOrder && sortOrder !== "desc") next.set("sortOrder", sortOrder);
    else next.delete("sortOrder");

    setSearchParams(next);
  };

  return (
    <main className="page page-shop">
      <section className="page-hero">
        <h1 className="page-title">Shop</h1>
        <p className="page-subtitle">
          Full product catalog on its own page — filters sync to the URL for
          sharing.
        </p>
        <div className="page-toolbar">
          <input
            type="search"
            className="input input-search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
        </div>
        <form className="shop-filter-panel" onSubmit={applyFilterSettings}>
          <div className="filter-group">
            <label htmlFor="filter-min-price">Min price</label>
            <input
              id="filter-min-price"
              type="number"
              min="0"
              className="input"
              placeholder="₹0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-max-price">Max price</label>
            <input
              id="filter-max-price"
              type="number"
              min="0"
              className="input"
              placeholder="₹999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-sort-by">Sort by</label>
            <select
              id="filter-sort-by"
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-sort-order">Order</label>
            <select
              id="filter-sort-order"
              className="input"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Highest first</option>
              <option value="asc">Lowest first</option>
            </select>
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">
              Apply filters
            </button>
          </div>
        </form>
        <div className="chips">
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip${category === c.id ? " chip--active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section">
        {loading ? (
          <p className="page-muted">Loading products…</p>
        ) : (
          <div className="products-grid">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} showRating />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Shop;
