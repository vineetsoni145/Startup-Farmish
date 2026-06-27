import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/products.api";
import ProductCard from "../components/ProductCard";
import { usePageMetadata } from "../hooks/usePageMetadata";

function SearchPage() {
  usePageMetadata(
    "Search",
    "Search fresh farm produce across categories with filters and sorting.",
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [input, setInput] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "relevance",
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc",
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setInput(q);
    setQuery(q);
    setCategory(searchParams.get("category") || "all");
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

  const runSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    const q = input.trim();
    if (q) next.set("q", q);
    else next.delete("q");
    setSearchParams(next);
  };

  const applySearchFilters = (event) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    const q = input.trim();
    if (q) next.set("q", q);
    else next.delete("q");
    if (category && category !== "all") next.set("category", category);
    else next.delete("category");
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

  const hasActiveFilters =
    query || category !== "all" || minPrice.trim() || maxPrice.trim();

  return (
    <main className="page page-pad page-search">
      <h1 className="page-title">Search</h1>
      <p className="page-subtitle">
        Dedicated search page — matches your future{" "}
        <code>GET /products?q=</code> endpoint.
      </p>
      <form className="search-page-form" onSubmit={runSearch}>
        <input
          type="search"
          className="input search-page-input"
          placeholder="Search vegetables, fruits, staples…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search catalog"
        />
        <button type="submit" className="btn btn-buy-now search-page-submit">
          Search
        </button>
      </form>
      <form className="search-filter-panel" onSubmit={applySearchFilters}>
        <div className="filter-group">
          <label htmlFor="search-category">Category</label>
          <select
            id="search-category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="pulses">Pulses</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="search-min-price">Min price</label>
          <input
            id="search-min-price"
            type="number"
            min="0"
            className="input"
            placeholder="₹0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="search-max-price">Max price</label>
          <input
            id="search-max-price"
            type="number"
            min="0"
            className="input"
            placeholder="₹999"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="search-sort-by">Sort by</label>
          <select
            id="search-sort-by"
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
          <label htmlFor="search-sort-order">Order</label>
          <select
            id="search-sort-order"
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

      {loading ? (
        <p className="page-muted">Searching…</p>
      ) : hasActiveFilters ? (
        <>
          <h2 className="panel-title">
            {query
              ? `Results for “${query}” (${items.length})`
              : `Filtered results (${items.length})`}
          </h2>
          {items.length === 0 ? (
            <p className="page-muted">
              No matches. Try another keyword or{" "}
              <Link to="/shop" className="inline-link">
                browse the shop
              </Link>
              .
            </p>
          ) : (
            <div className="products-grid">
              {items.map((item) => (
                <ProductCard key={item.id} product={item} showRating />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="page-muted">
          Type a product name and press Search, or open the{" "}
          <Link to="/shop" className="inline-link">
            full shop
          </Link>
          .
        </p>
      )}
    </main>
  );
}

export default SearchPage;
