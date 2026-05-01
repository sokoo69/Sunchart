export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  category: string;
  badge?: string;
  features?: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "UV Protection Sunglasses",
    brand: "SunShade",
    price: 15,
    originalPrice: 30,
    rating: 4.7,
    stock: 10,
    description:
      "Stylish UV400 protection sunglasses perfect for summer outings. Lightweight polarized lenses reduce glare while keeping your eyes safe from harmful UV rays. The durable frame fits all face shapes and comes with a premium case.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessories",
    badge: "Best Seller",
    features: [
      "UV400 Protection",
      "Polarized Lenses",
      "Lightweight Frame",
      "Includes Case",
    ],
  },
  {
    id: 2,
    name: "Tropical Floral Swimsuit",
    brand: "WaveRider",
    price: 45,
    originalPrice: 90,
    rating: 4.5,
    stock: 15,
    description:
      "Vibrant tropical floral one-piece swimsuit made from quick-dry, chlorine-resistant fabric. Perfect for beach days and pool parties. Available in multiple sizes with adjustable straps for the perfect fit.",
    image:
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80",
    category: "Swimwear",
    badge: "Hot Deal 🔥",
    features: [
      "Quick-Dry Fabric",
      "Chlorine Resistant",
      "Adjustable Straps",
      "UPF 50+",
    ],
  },
  {
    id: 3,
    name: "SPF 50 Sunscreen Lotion",
    brand: "GlowShield",
    price: 22,
    originalPrice: 35,
    rating: 4.8,
    stock: 50,
    description:
      "Broad-spectrum SPF 50 sunscreen lotion with reef-safe formula. Water-resistant for up to 80 minutes. Enriched with Vitamin E and aloe vera for hydrated, protected skin all day long.",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    category: "Skincare",
    badge: "Top Rated ⭐",
    features: [
      "SPF 50 Broad Spectrum",
      "Water Resistant 80min",
      "Reef-Safe Formula",
      "Vitamin E & Aloe",
    ],
  },
  {
    id: 4,
    name: "Premium Beach Tote Bag",
    brand: "CoastalCraft",
    price: 35,
    originalPrice: 60,
    rating: 4.6,
    stock: 20,
    description:
      "Spacious woven beach tote with inner zipper pocket and water-resistant lining. Fits towels, sunscreen, snacks and more. Stylish boho design that pairs with any beach outfit.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Accessories",
    badge: "New Arrival",
    features: [
      "Water-Resistant Lining",
      "Inner Zipper Pocket",
      "Extra Large Capacity",
      "Boho Woven Design",
    ],
  },
  {
    id: 5,
    name: "Linen Breezy Summer Shirt",
    brand: "SandDune",
    price: 38,
    originalPrice: 65,
    rating: 4.4,
    stock: 30,
    description:
      "Ultra-lightweight linen summer shirt with a relaxed fit. Breathable natural fibers keep you cool on the hottest days. Perfect for beach walks, outdoor dining, or casual summer events.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    category: "Clothing",
    badge: "Summer Pick",
    features: [
      "100% Natural Linen",
      "Breathable Fabric",
      "Relaxed Fit",
      "Machine Washable",
    ],
  },
  {
    id: 6,
    name: "Inflatable Pool Float",
    brand: "AquaFun",
    price: 28,
    originalPrice: 50,
    rating: 4.3,
    stock: 25,
    description:
      "Giant flamingo inflatable pool float made from heavy-duty PVC. Holds up to 200 lbs and inflates in minutes. Perfect for pools, lakes, and beaches. Vibrant pink color fades-resistant.",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80",
    category: "Beach",
    badge: "Fun Pick 🎉",
    features: [
      "Heavy-Duty PVC",
      "Holds 200 lbs",
      "Quick Inflate",
      "Fade-Resistant Color",
    ],
  },
  {
    id: 7,
    name: "Waterproof Sandals",
    brand: "TideWalker",
    price: 42,
    originalPrice: 75,
    rating: 4.9,
    stock: 18,
    description:
      "Durable waterproof sandals with arch support and non-slip sole. Quick-dry straps and cushioned footbed for all-day comfort. Ideal for beach, hiking, and water sports.",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
    category: "Footwear",
    badge: "Premium ✨",
    features: [
      "Arch Support",
      "Non-Slip Sole",
      "Quick-Dry Straps",
      "Cushioned Footbed",
    ],
  },
  {
    id: 8,
    name: "Aloe Vera After-Sun Gel",
    brand: "GlowShield",
    price: 18,
    originalPrice: 28,
    rating: 4.7,
    stock: 40,
    description:
      "Cooling aloe vera gel that soothes and hydrates sun-exposed skin. Pure 99% aloe vera with chamomile and green tea extract. Provides instant relief from sunburn and restores skin moisture.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    category: "Skincare",
    badge: "Soothing 🌿",
    features: [
      "99% Pure Aloe",
      "Chamomile Extract",
      "Green Tea Antioxidants",
      "Instant Cooling",
    ],
  },
];

export default products;
