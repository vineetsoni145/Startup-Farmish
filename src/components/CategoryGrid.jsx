import React from "react";
import { useNavigate } from "react-router-dom";

export const CATEGORY_CARDS = [
  {
    slug: "vegetables",
    title: "Vegetables",
    text: "Fresh organic vegetables from local farms",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Fresh Vegetables",
  },
  {
    slug: "fruits",
    title: "Fruits",
    text: "Sweet and juicy seasonal fruits",
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Fresh Fruits",
  },
  {
    slug: "grains",
    title: "Grains",
    text: "Wholesome organic grains and cereals",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Organic Grains",
  },
  {
    slug: "pulses",
    title: "Pulses",
    text: "Protein-rich lentils and legumes",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    alt: "Organic Pulses",
  },
];

/**
 * @param {{ showTitle?: boolean }} props
 */
function CategoryGrid({ showTitle = true }) {
  const navigate = useNavigate();

  const goCategory = (slug) => {
    navigate(`/shop?category=${slug}`);
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        {showTitle ? (
          <h2 className="categories-title">Shop by Category</h2>
        ) : null}
        <div className="categories-grid">
          {CATEGORY_CARDS.map((cat) => (
            <div className="category-card" key={cat.slug}>
              <div className="category-image">
                <img src={cat.img} alt={cat.alt} />
              </div>
              <div className="category-content">
                <h3>{cat.title}</h3>
                <p>{cat.text}</p>
                <button
                  type="button"
                  className="category-btn"
                  title={`Browse ${cat.title}`}
                  aria-label={`Browse ${cat.title} category`}
                  onClick={() => goCategory(cat.slug)}
                >
                  <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
