"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiEdit2, FiCalendar, FiLogOut, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

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
            <p className="opacity-70 mb-4">Please log in to view your profile.</p>
            <Link
              href="/login?redirect=/my-profile"
              className="btn btn-primary w-full"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">My <span className="text-primary">Profile</span></h1>
          <p className="opacity-70">Manage your account information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar / Main Info */}
          <div className="md:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-200 text-center card-lift">
              <div className="card-body items-center">
                <div className="avatar mb-4">
                  <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative overflow-hidden">
                    {user.image && !imageError ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={96}
                        height={96}
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center">
                        <span className="text-4xl text-primary-content font-bold">
                          {(user.name || user.email || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h2 className="card-title justify-center w-full mb-1">{user.name || "Summer Lover"}</h2>
                <div className="badge badge-success gap-1 mb-4">Verified</div>
                
                <Link
                  href="/my-profile/update"
                  className="btn btn-primary w-full gap-2 mb-2"
                >
                  <FiEdit2 /> Update Info
                </Link>
                
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn btn-error btn-outline w-full gap-2"
                >
                  {loggingOut ? <span className="loading loading-spinner loading-sm"></span> : <><FiLogOut /> Logout</>}
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg border-b border-base-200 pb-4 mb-4">Account Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-box">
                    <div className="p-3 bg-base-100 rounded-full shadow-sm text-primary">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold opacity-70">Full Name</p>
                      <p className="font-medium">{user.name || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-box">
                    <div className="p-3 bg-base-100 rounded-full shadow-sm text-secondary">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold opacity-70">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-box">
                    <div className="p-3 bg-base-100 rounded-full shadow-sm text-success">
                      <FiCalendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold opacity-70">Member Since</p>
                      <p className="font-medium">{joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg border-b border-base-200 pb-4 mb-4">Recent Activity</h3>
                <ul className="timeline timeline-vertical timeline-compact">
                  <li>
                    <div className="timeline-middle text-primary">✓</div>
                    <div className="timeline-end timeline-box">Account created successfully</div>
                    <hr className="bg-primary" />
                  </li>
                  <li>
                    <div className="timeline-middle text-primary">✓</div>
                    <div className="timeline-end timeline-box">Logged in</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
