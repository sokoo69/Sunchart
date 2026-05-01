"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiUser, FiLink, FiArrowLeft, FiSave, FiLock, FiCamera } from "react-icons/fi";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile/update");
    }
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || undefined,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Update failed. Please try again.");
    } else {
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    }
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
            <p className="opacity-70 mb-4">Please log in to update your profile.</p>
            <Link
              href="/login?redirect=/my-profile/update"
              className="btn btn-primary w-full"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayImage = image && !previewError ? image : null;

  return (
    <div className="py-10">
      <div className="max-w-lg mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm gap-2 mb-6"
        >
          <FiArrowLeft /> Back to Profile
        </button>

        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Update <span className="text-primary">Info</span></h2>
              <p className="opacity-70">Update your name and profile photo</p>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="indicator">
                <span className="indicator-item badge badge-primary p-2"><FiCamera size={14} /></span> 
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="object-cover"
                        onError={() => setPreviewError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-base-300 flex items-center justify-center text-3xl font-bold text-base-content/50">
                        {(name || session.user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Full Name <span className="text-error">*</span></span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input input-bordered w-full pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Profile Photo URL <span className="font-normal opacity-60">(optional)</span></span>
                </label>
                <div className="relative">
                  <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full pl-10"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setPreviewError(false);
                    }}
                  />
                </div>
              </div>

              <div className="alert bg-base-200 mt-2 py-3 text-sm rounded-lg">
                <div>
                  <span className="font-bold">Email:</span> {session.user.email} <span className="opacity-60">(cannot be changed)</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Link href="/my-profile" className="btn btn-outline flex-1">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? <span className="loading loading-spinner"></span> : <><FiSave size={18} /> Update Info</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
