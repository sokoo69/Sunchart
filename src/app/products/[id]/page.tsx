"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import products from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiHeart,
  FiCheck,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiLock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(resolvedParams.id));

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/products/${resolvedParams.id}`);
    }
  }, [session, isPending, router, resolvedParams.id]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card w-96 bg-base-100 shadow-xl border border-base-200 text-center">
          <div className="card-body items-center">
            <FiLock className="text-warning text-5xl mb-2" />
            <h2 className="card-title">Authentication Required</h2>
            <p className="opacity-70 mb-4">Please log in to view product details.</p>
            <Link
              href={`/login?redirect=/products/${resolvedParams.id}`}
              className="btn btn-primary w-full"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-error">Product Not Found</h2>
          <Link href="/products" className="btn btn-primary mt-4">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm gap-2 mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Side */}
          <div>
            <div className="relative aspect-square rounded-box overflow-hidden bg-base-200 border border-base-300 shadow-sm img-zoom">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="badge badge-primary badge-lg border-none">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="badge badge-error text-white badge-lg border-none font-bold">
                    -{discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-bold text-secondary uppercase tracking-widest mb-1">
                {product.category}
              </div>
              <h1 className="text-4xl font-black mb-2">{product.name}</h1>
              <p className="text-base-content/60 text-sm">By {product.brand}</p>
            </div>

            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={20} />
              <span className="font-bold text-primary">{product.rating}</span>
              <span className="opacity-60 text-sm">({product.stock} reviews)</span>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl line-through opacity-50 pb-1">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="bg-base-200 p-6 rounded-box">
              <p className="opacity-80 leading-relaxed">{product.description}</p>
            </div>

            {product.features && (
              <div>
                <h3 className="font-bold mb-3 uppercase text-sm opacity-70 tracking-wider">
                  Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm opacity-90">
                      <FiCheck className="text-success" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="divider my-0"></div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold">Quantity</span>
                </label>
                <div className="join border border-base-300">
                  <button 
                    className="btn btn-ghost join-item rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <div className="flex items-center justify-center px-4 bg-base-100 join-item font-bold min-w-[3rem]">
                    {quantity}
                  </div>
                  <button 
                    className="btn btn-ghost join-item rounded-l-none"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >+</button>
                </div>
              </div>

              <button
                className={`btn flex-1 ${addedToCart ? "btn-success" : "btn-primary"} text-white`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? <><FiCheck size={18} /> Added</> : <><FiShoppingCart size={18} /> Add to Cart</>}
              </button>

              <button 
                className={`btn btn-square ${wishlist ? "btn-error text-white" : "btn-outline"}`}
                onClick={() => {
                  setWishlist(!wishlist);
                  toast.success(wishlist ? "Removed from wishlist" : "Added to wishlist");
                }}
              >
                <FiHeart size={20} fill={wishlist ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-base-200">
              <div className="flex flex-col items-center text-center gap-1">
                <FiShield className="text-primary text-2xl mb-1" />
                <span className="text-xs opacity-70">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <FiTruck className="text-primary text-2xl mb-1" />
                <span className="text-xs opacity-70">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <FiRefreshCw className="text-primary text-2xl mb-1" />
                <span className="text-xs opacity-70">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
