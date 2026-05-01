"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const sortOptions = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A-Z" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 md:py-24 border-b border-amber-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center animate__animated animate__fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Summer <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium summer essentials. From stylish sunglasses to refreshing skincare, find everything you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Filters Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 mb-10 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 bg-gray-200 rounded-full p-1"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
              {/* Category Pills */}
              <div className="flex-1 sm:flex-none overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`whitespace-nowrap px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                        category === cat 
                          ? "bg-gray-900 text-white shadow-md" 
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Select */}
              <div className="relative shrink-0">
                <select
                  className="appearance-none w-full sm:w-48 pl-4 pr-10 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none font-medium text-gray-700 text-sm cursor-pointer transition-all"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <FiFilter size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 px-2 animate__animated animate__fadeIn">
          <p className="text-gray-500 font-medium text-sm">
            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> products
          </p>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm mt-8 animate__animated animate__zoomIn">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              We couldn&apos;t find anything matching "{search}". Try adjusting your search or filter options.
            </p>
            <button
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-md"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
