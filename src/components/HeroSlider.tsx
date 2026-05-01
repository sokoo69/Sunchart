"use client";

import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Summer Sale 50% OFF",
      desc: "Get the best deals on premium sunglasses and swimwear this season.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg"
    },
    {
      title: "Hot Deals 🔥",
      desc: "Limited-time offers on the most popular summer skincare products.",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1920&q=80",
      btnClass: "bg-white text-gray-900 hover:bg-gray-100 border-none shadow-lg"
    },
    {
      title: "New Arrivals",
      desc: "Explore our brand new summer collection for your next beach trip.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80",
      btnClass: "bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-lg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gray-900 mt-16 md:mt-0">
      {slides.map((slide, i) => (
        <div 
          key={i} 
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center justify-center"
          style={{ opacity: currentSlide === i ? 1 : 0, zIndex: currentSlide === i ? 10 : 0 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className="object-cover"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Text Content */}
          <div className="relative z-20 text-center px-4 max-w-3xl mx-auto animate__animated animate__fadeInUp">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg tracking-tight leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-gray-100 drop-shadow-md font-medium">
              {slide.desc}
            </p>
            <Link href="/products" className={`btn btn-lg px-8 rounded-full ${slide.btnClass} transition-transform hover:scale-105`}>
              Shop Now
            </Link>
          </div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-4 md:left-10 right-4 md:right-10 top-1/2 z-30">
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors border border-white/30"
          aria-label="Previous Slide"
        >
          <FiChevronLeft size={24} />
        </button> 
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors border border-white/30"
          aria-label="Next Slide"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full h-2 ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
