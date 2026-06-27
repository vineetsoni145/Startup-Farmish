import React from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import Carousel from "../components/Carousel";
import HomeQuickLinks from "../components/HomeQuickLinks";
import HomeFeatured from "../components/HomeFeatured";

function Home() {
  usePageMetadata(
    "Home",
    "Browse fresh organic fruits, vegetables, grains and farm products from Farmish.",
  );
  return (
    <main className="page-home">
      {/* Delivery announcement bar */}
      <section className="delivery-status">
        <h3>✦ Express Delivery Service</h3>
        <p>Premium farm-fresh produce delivered in 2–4 hours</p>
      </section>

      <Carousel />
      <HomeQuickLinks />
      <HomeFeatured />

      {/* Values section */}
      <section
        style={{
          padding: "3.5rem 1.5rem",
          background:
            "linear-gradient(135deg, var(--royal-deep) 0%, var(--royal-forest) 100%)",
          borderTop: "var(--border-royal)",
          borderBottom: "var(--border-royal)",
          marginBottom: "3rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-utility)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--royal-gold)",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Our Promise
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontStyle: "italic",
              color: "var(--royal-ivory)",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            A Standard Fit for Home
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "fa-leaf",
                title: "100% Organic",
                text: "Every item certified organic, sourced from trusted partner farms",
              },
              {
                icon: "fa-truck-fast",
                title: "Swift Delivery",
                text: "From farm to doorstep in under 4 hours, guaranteed fresh",
              },
              {
                icon: "fa-shield-alt",
                title: "Quality Assured",
                text: "Each product inspected and curated by our harvest experts",
              },
              {
                icon: "fa-handshake",
                title: "Farm Partners",
                text: "Direct relationships with over 200 ethical farming families",
              },
            ].map((v) => (
              <div key={v.title} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: "1px solid rgba(201,168,76,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    background: "rgba(201,168,76,0.08)",
                    fontSize: "1.15rem",
                    color: "var(--royal-gold-bright)",
                  }}
                >
                  <i className={`fas ${v.icon}`} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "var(--royal-ivory)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-utility)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.04em",
                    color: "rgba(201,168,76,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
