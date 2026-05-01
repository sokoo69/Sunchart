"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiLink, FiEye, FiEyeOff, FiSun, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");
    setLoading(true);

    const { data, error: err } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoUrl || undefined,
    });

    setLoading(false);

    if (err) {
      setError(err.message || "Registration failed. Please try again.");
      toast.error("Registration failed!");
    } else if (data) {
      toast.success("Account created successfully!");
      window.location.assign("/");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-emerald-50 opacity-50"></div>
        <div className="relative z-10 p-12 text-center">
          <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-white shadow-xl mb-8 text-blue-500 animate__animated animate__bounceIn">
            <FiSun size={48} />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight animate__animated animate__fadeInUp">
            Join <span className="text-blue-500">SunCart</span> Today
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            Create your account and start exploring the best summer deals exclusively for you.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md animate__animated animate__fadeIn">
          
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <FiSun className="text-blue-500 text-3xl" />
            <span className="font-extrabold text-2xl">SunCart</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-500">Sign up to get started with SunCart.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 border border-red-100">
              <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 mb-6"
          >
            {googleLoading ? <span className="loading loading-spinner w-5 h-5"></span> : <FcGoogle size={22} />}
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 font-medium">OR REGISTER WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-11 pr-4 py-3 hero-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full pl-11 pr-4 py-3 hero-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Photo URL <span className="font-normal text-gray-400">(optional)</span></label>
              <div className="relative">
                <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-11 pr-4 py-3 hero-input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full pl-11 pr-12 py-3 hero-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 hero-btn hero-btn-primary flex justify-center items-center gap-2 mt-4"
              style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)' }}
            >
              {loading ? <span className="loading loading-spinner w-5 h-5"></span> : "Create Account"}
              {!loading && <FiArrowRight />}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
