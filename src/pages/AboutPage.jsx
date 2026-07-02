import React from "react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata";
import BackButton from "../components/BackButton";

function AboutPage() {
  usePageMetadata(
    "About Farmish",
    "Learn about our mission to connect farms with families, delivering fresh produce straight from the fields to your doorstep.",
  );

  return (
    <main className="page page-pad page-about">
      <BackButton />

      {/* Hero Section */}
      <div className="about-hero">
        <h1 className="about-hero__title">Farm Fresh, Family First</h1>
        <p className="about-hero__subtitle">
          From our fields to your table — delivering nature's best since 2024
        </p>
      </div>

      {/* Story Section */}
      <section className="about-section about-story">
        <div className="about-content">
          <h2 className="about-heading">Our Story</h2>
          <div className="about-text">
            <p>
              Farmish began with a simple belief:{" "}
              <strong>
                everyone deserves access to fresh, healthy produce grown with
                care.
              </strong>{" "}
              What started as a small family farm in the countryside has
              blossomed into a mission to connect local farmers with urban
              families who value quality, sustainability, and taste.
            </p>
            <p>
              We saw families struggling to find truly fresh vegetables and
              fruits amidst the convenience of supermarket chains. We saw
              farmers with abundant harvests but limited access to customers who
              would appreciate their craft.{" "}
              <strong>Farmish was born to bridge this gap.</strong>
            </p>
            <p>
              Today, we partner with <strong>over 50 local farms</strong> across
              the region, delivering farm-fresh produce to thousands of homes
              within hours of harvest. Every carrot, every tomato, every grain
              tells a story of dedication, sustainable farming, and our
              commitment to your family's health.
            </p>
          </div>
        </div>
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
            alt="Lush green farm fields at sunrise"
            loading="lazy"
          />
          <div className="about-image-caption">
            Our partner farms at sunrise
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section about-mission">
        <div className="about-mission-grid">
          <div className="about-mission-card">
            <div className="about-mission-icon">🌱</div>
            <h3>Sustainable Farming</h3>
            <p>
              We partner only with farms that practice organic and sustainable
              farming methods, protecting our soil and environment for future
              generations.
            </p>
          </div>
          <div className="about-mission-card">
            <div className="about-mission-icon">🚜</div>
            <h3>Support Local Farmers</h3>
            <p>
              Fair prices, direct partnerships, and community support ensure our
              farmers thrive while you get the freshest produce possible.
            </p>
          </div>
          <div className="about-mission-card">
            <div className="about-mission-icon">❤️</div>
            <h3>Family Health First</h3>
            <p>
              No pesticides, no artificial ripening, no compromise. Just pure,
              nutritious food grown the way nature intended.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section with Images */}
      <section className="about-section about-values">
        <h2 className="about-heading text-center">What We Believe In</h2>
        <div className="about-values-grid">
          <div className="about-value-item">
            <img
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80"
              alt="Fresh organic vegetables"
              loading="lazy"
            />
            <div className="about-value-content">
              <h3>Quality Over Quantity</h3>
              <p>
                We carefully select each harvest, ensuring only the finest
                produce reaches your kitchen. If it's not good enough for our
                families, it's not good enough for yours.
              </p>
            </div>
          </div>
          <div className="about-value-item about-value-item--reverse">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
              alt="Farmer harvesting crops"
              loading="lazy"
            />
            <div className="about-value-content">
              <h3>Farm to Table in Hours</h3>
              <p>
                Our logistics ensure your produce is picked at peak freshness
                and delivered within hours. No warehouses, no storage — just
                direct, swift delivery from soil to your doorstep.
              </p>
            </div>
          </div>
          <div className="about-value-item">
            <img
              src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=80"
              alt="Community gathering"
              loading="lazy"
            />
            <div className="about-value-content">
              <h3>Building Community</h3>
              <p>
                More than a delivery service, we're creating connections between
                farmers and families, fostering appreciation for where our food
                comes from and the hands that grow it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section about-stats">
        <div className="about-stats-grid">
          <div className="about-stat">
            <div className="about-stat-number">50+</div>
            <div className="about-stat-label">Partner Farms</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number">10K+</div>
            <div className="about-stat-label">Happy Families</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number">100%</div>
            <div className="about-stat-label">Organic & Fresh</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number">2-4hr</div>
            <div className="about-stat-label">Delivery Time</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section about-cta">
        <div className="about-cta-content">
          <h2>Experience the Farmish Difference</h2>
          <p>
            Join thousands of families who trust us for their daily fresh
            produce needs.
          </p>
          <div className="about-cta-buttons">
            <Link to="/shop" className="btn btn-buy-now">
              Start Shopping
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
