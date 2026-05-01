import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products";
import Link from "next/link";
import { FiSun, FiHeart, FiWind, FiDroplet, FiEye, FiShield, FiUmbrella, FiNavigation } from "react-icons/fi";

export const metadata: Metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Shop premium summer essentials at SunCart.",
};

const popularProducts = products.slice(0, 3);

const careTips = [
  {
    icon: FiSun,
    title: "Daily SPF Protection",
    desc: "Apply SPF 30+ sunscreen every morning.",
  },
  {
    icon: FiDroplet,
    title: "Stay Hydrated",
    desc: "Drink at least 8 glasses of water daily.",
  },
  {
    icon: FiWind,
    title: "Breathable Fabrics",
    desc: "Choose lightweight linen or cotton fabrics.",
  },
  {
    icon: FiHeart,
    title: "After-Sun Care",
    desc: "Soothe sun-exposed skin with cooling aloe.",
  },
];

const brands = [
  { name: "SunShade", desc: "Premium Eyewear", icon: FiEye, color: "text-amber-500" },
  { name: "WaveRider", desc: "Beach Fashion", icon: FiNavigation, color: "text-blue-500" },
  { name: "GlowShield", desc: "Skincare Experts", icon: FiShield, color: "text-emerald-500" },
  { name: "CoastalCraft", desc: "Beach Accessories", icon: FiUmbrella, color: "text-rose-500" },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Popular Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Popular Products</h2>
          <p className="text-gray-500">Handpicked summer essentials loved by thousands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {popularProducts.map((product) => (
            <div key={product.id} className="animate__animated animate__fadeInUp">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products" className="btn btn-outline btn-primary">
            View All Products
          </Link>
        </div>
      </section>

      {/* Summer Tips */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Summer Care Tips</h2>
            <p className="text-gray-500">Expert tips to keep you healthy and hydrated.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careTips.map((tip, i) => (
              <div key={i} className="card bg-white shadow-sm border border-gray-100 p-6 text-center animate__animated animate__fadeInUp">
                <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-700">
                  <tip.icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Top Brands</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">We partner with the best summer brands to bring you premium quality.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <div key={i} className="hero-card group p-6 flex items-center gap-5 cursor-pointer animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300 shadow-inner ${brand.color}`}>
                <brand.icon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-500 transition-colors">{brand.name}</h3>
                <p className="text-gray-500 text-sm">{brand.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
