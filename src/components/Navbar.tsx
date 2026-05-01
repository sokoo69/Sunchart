"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiSun, FiMenu, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  if (session) {
    navLinks.push({ label: "My Profile", href: "/my-profile" });
  }

  return (
    <div className="navbar glass-nav fixed top-0 z-50 px-4 md:px-8 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden p-2 rounded-full">
            <FiMenu size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white rounded-2xl w-56 border border-gray-100"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="mb-1">
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    pathname === link.href 
                      ? "bg-amber-50 text-amber-600 font-semibold" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl gap-2 hover:bg-transparent rounded-full px-2">
          <div className="bg-amber-100 p-1.5 rounded-full text-amber-500">
            <FiSun size={20} />
          </div>
          <span className="font-extrabold text-gray-900 tracking-tight">SunCart</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-5 py-2.5 rounded-full transition-all text-sm font-medium ${
                  pathname === link.href 
                    ? "bg-amber-50 text-amber-600" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {isPending ? (
          <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-2 ring-amber-100 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 text-white font-bold flex items-center justify-center shadow-md">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg">
                    {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-4 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-2xl w-60 border border-gray-100"
            >
              <div className="px-4 py-3 border-b border-gray-100 mb-2">
                <p className="text-sm font-semibold text-gray-900 truncate">{session.user.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
              <li className="mb-1"><Link href="/my-profile" className="rounded-xl py-2 px-4 hover:bg-gray-50">Profile Settings</Link></li>
              <li>
                <button onClick={handleLogout} className="rounded-xl py-2 px-4 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <FiLogOut /> Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
