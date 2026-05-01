import Link from "next/link";
import { FiHome, FiShoppingBag } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-base-200">
      <div className="text-center max-w-lg">
        <div className="text-[10rem] leading-none mb-4 float-anim">☀️</div>
        <h1 className="text-8xl font-black text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="opacity-70 text-lg mb-8 leading-relaxed">
          Looks like this page got lost at sea! The summer adventure continues on
          other shores.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary btn-lg rounded-full shadow-lg gap-2">
            <FiHome size={20} /> Go Home
          </Link>
          <Link href="/products" className="btn btn-outline btn-lg rounded-full gap-2">
            <FiShoppingBag size={20} /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
