"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import StarRating from "./StarRating";
import { FiArrowRight } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="hero-card group overflow-hidden flex flex-col h-full bg-white relative">
      <figure className="relative h-64 w-full bg-[#f8fafc] flex-shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {product.badge}
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              -{discount}%
            </div>
          )}
        </div>
      </figure>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-amber-500 tracking-wider uppercase mb-2">
          {product.brand}
        </p>
        <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-1" title={product.name}>
          {product.name}
        </h2>
        
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-sm font-bold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.stock} in stock)</span>
        </div>
        
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs line-through text-gray-400 mb-0.5">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-2xl font-black text-gray-900 leading-none">
              ${product.price}
            </span>
          </div>
          
          <Link 
            href={`/products/${product.id}`} 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 group-hover:bg-amber-500 group-hover:text-white transition-colors"
          >
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
