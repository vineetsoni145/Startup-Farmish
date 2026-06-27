/** Shared catalog — mirrors future GET /products */

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains" },
  { id: "pulses", label: "Pulses" },
];

const _products = [
  {
    id: "carrots",
    name: "Fresh Organic Carrots",
    priceRupees: 120,
    unitLabel: "kg",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Crisp, sweet carrots from partner farms. Washed and ready to cook.",
    full: 5,
    empty: 0,
    ratingText: "(4.8)",
  },
  {
    id: "spinach",
    name: "Fresh Spinach Leaves",
    priceRupees: 80,
    unitLabel: "bunch",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Tender leaves, ideal for salads and quick stir-fries.",
    full: 5,
    empty: 0,
    ratingText: "(4.9)",
  },
  {
    id: "tomatoes",
    name: "Farm Fresh Tomatoes",
    priceRupees: 90,
    unitLabel: "kg",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Vine-ripened tomatoes with rich flavour for curries and salads.",
    full: 4,
    empty: 1,
    ratingText: "(4.6)",
  },
  {
    id: "cucumbers",
    name: "Fresh Cucumbers",
    priceRupees: 60,
    unitLabel: "kg",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Cool, hydrating cucumbers — perfect for raita and snacks.",
    full: 5,
    empty: 0,
    ratingText: "(4.7)",
  },
  {
    id: "potatoes",
    name: "Farm Fresh Potatoes",
    priceRupees: 40,
    unitLabel: "kg",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Versatile brown potatoes, great for roasting and curries.",
    full: 5,
    empty: 0,
    ratingText: "(4.8)",
  },
  {
    id: "broccoli",
    name: "Fresh Broccoli",
    priceRupees: 150,
    unitLabel: "piece",
    category: "vegetables",
    img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Compact heads, high in fibre — steam, roast, or stir-fry.",
    full: 4,
    empty: 1,
    ratingText: "(4.5)",
  },
  {
    id: "apples",
    name: "Himachal Apples",
    priceRupees: 180,
    unitLabel: "kg",
    category: "fruits",
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Crisp red apples with balanced sweetness.",
    full: 5,
    empty: 0,
    ratingText: "(4.7)",
  },
  {
    id: "bananas",
    name: "Premium Bananas",
    priceRupees: 60,
    unitLabel: "dozen",
    category: "fruits",
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Naturally ripened, energy-rich bananas.",
    full: 5,
    empty: 0,
    ratingText: "(4.6)",
  },
  {
    id: "rice",
    name: "Organic Basmati Rice",
    priceRupees: 220,
    unitLabel: "kg",
    category: "grains",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Long-grain basmati — aromatic and fluffy when cooked.",
    full: 5,
    empty: 0,
    ratingText: "(4.9)",
  },
  {
    id: "dal",
    name: "Yellow Moong Dal",
    priceRupees: 140,
    unitLabel: "kg",
    category: "pulses",
    img: "https://images.unsplash.com/photo-1780478238047-13e4e6c07cba?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    description: "Protein-rich split moong — quick cooking everyday dal.",
    full: 5,
    empty: 0,
    ratingText: "(4.8)",
  },
];

export const PRODUCTS = _products.map((p) => ({
  ...p,
  priceDisplay: `₹${p.priceRupees}/${p.unitLabel}`,
  ratingScore: Number(p.ratingText.replace(/[()]/g, "")) || 0,
}));

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function listProducts({
  category = "all",
  query = "",
  minPrice,
  maxPrice,
  sortBy = "relevance",
  sortOrder = "desc",
} = {}) {
  let list = [...PRODUCTS];
  if (category && category !== "all") {
    list = list.filter((p) => p.category === category);
  }
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  if (typeof minPrice === "string" && minPrice.trim()) {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      list = list.filter((p) => p.priceRupees >= min);
    }
  }
  if (typeof maxPrice === "string" && maxPrice.trim()) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      list = list.filter((p) => p.priceRupees <= max);
    }
  }
  if (sortBy === "price") {
    list.sort((a, b) => a.priceRupees - b.priceRupees);
  } else if (sortBy === "rating") {
    list.sort((a, b) => a.ratingScore - b.ratingScore);
  }
  if (sortBy !== "relevance" && sortOrder === "desc") {
    list.reverse();
  }
  return list;
}
