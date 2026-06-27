import React from "react";
import { Link } from "react-router-dom";
import CategoryGrid from "../components/CategoryGrid";

function CategoriesPage() {
  return (
    <main className="page page-pad page-categories">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden> / </span>
        <span>Categories</span>
      </nav>
      <h1 className="page-title">Categories</h1>
      <p className="page-subtitle">
        Choose a category — you will land on the shop with that filter applied.
      </p>
      <CategoryGrid showTitle={false} />
    </main>
  );
}

export default CategoriesPage;
