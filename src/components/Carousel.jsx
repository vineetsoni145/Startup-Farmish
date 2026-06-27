import React, { useEffect, useState, useCallback } from "react";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=90",
    eyebrow: "Seasonal Collection",
    title: "Winter's Finest Harvest",
    text: "Curated seasonal produce delivered from estate farms to your door",
  },
  {
    img: "https://images.unsplash.com/photo-1467453678174-768ec283a940?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=90",
    eyebrow: "Farm-to-Table",
    title: "The Art of Fresh Living",
    text: "Premium organic vegetables, harvested at the peak of perfection",
  },
  {
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=90",
    eyebrow: "Organic Certified",
    title: "Nature's Bounty",
    text: "Certified organic. Sustainably sourced. Delivered with care.",
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  return (
    <section className="carousel-container">
      <div
        className="carousel"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live="polite"
      >
        {SLIDES.map((slide, i) => (
          <div
            className="carousel-slide"
            key={slide.title}
            aria-hidden={i !== index}
          >
            <img
              src={slide.img}
              alt={slide.title}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="slide-content">
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-utility)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--royal-gold-bright)",
                  marginBottom: "0.6rem",
                  opacity: 0.9,
                }}
              >
                {slide.eyebrow}
              </span>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "2rem",
          display: "flex",
          gap: "0.5rem",
          zIndex: 4,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === index ? "24px" : "8px",
              height: "2px",
              background:
                i === index
                  ? "var(--royal-gold-bright)"
                  : "rgba(201,168,76,0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel-nav prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        ❮
      </button>
      <button
        type="button"
        className="carousel-nav next"
        onClick={goNext}
        aria-label="Next slide"
      >
        ❯
      </button>
    </section>
  );
}

export default Carousel;
