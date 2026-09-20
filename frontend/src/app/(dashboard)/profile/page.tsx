"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  Loader2,
  Mail,
  Building2,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  UserRound,
  ImagePlus,
  Save,
  Lock,
  MoreVertical,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useGetCurrentUser } from "@/feature/auth/api/useAuth";
import { useUpdateProfile } from "@/feature/auth/api/useAuth";
import { errorToast, successToast } from "@/components/shared/tost";
import PageLoader from "@/components/shared/PageLoader";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { userImageUrl } from "@/lib/mediaUrl";

const pwOk = (p: string) =>
  p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const roleLabel = (role?: string) =>
  (role ?? "member").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function ProfilePage() {
  const { user, isLoading, isError } = useGetCurrentUser();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  const [name, setName] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [bannerMenuOpen, setBannerMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  useEffect(() => {
    if (!bannerMenuOpen) return;
    const close = () => setBannerMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [bannerMenuOpen]);

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [profilePreview, bannerPreview]);

  if (isLoading) return <PageLoader size="section" text="Loading profile..." />;
  if (isError || !user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );

  const profileSrc = userImageUrl(user.profileImage) || (profilePreview ?? null);
  const bannerSrc = userImageUrl(user.bannerImage) || (bannerPreview ?? null);

  const pickProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (profilePreview) URL.revokeObjectURL(profilePreview);
    setProfileFile(f);
    setProfilePreview(URL.createObjectURL(f));
  };

  const pickBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerFile(f);
    setBannerPreview(URL.createObjectURL(f));
  };

  const buildProfileForm = () => {
    const fd = new FormData();
    if (name && name !== user.name) fd.append("name", name);
    if (profileFile) fd.append("profileImage", profileFile);
    if (bannerFile) fd.append("bannerImage", bannerFile);
    return fd;
  };

  const saveProfile = async () => {
    try {
      await updateProfile(buildProfileForm());
      successToast("Profile updated");
      setProfileFile(null);
      setBannerFile(null);
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setProfilePreview(null);
      setBannerPreview(null);
    } catch (e) {
      errorToast("Failed to update profile");
    }
  };

  const savePassword = async () => {
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      return errorToast("New password and confirm password do not match");
    }
    if (!oldPassword) {
      return errorToast("Enter your current password to set a new password");
    }
    if (!pwOk(newPassword)) {
      return errorToast("Password must be 8+ chars with uppercase, lowercase & number");
    }
    const fd = new FormData();
    fd.append("oldPassword", oldPassword);
    fd.append("password", newPassword);
    try {
      await updateProfile(fd);
      successToast("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      errorToast("Failed to update password. Check your current password.");
    }
  };

  const canSaveProfile = Boolean(
    (name && name !== user.name) || profileFile || bannerFile
  );

  const removeBanner = async () => {
    setBannerMenuOpen(false);
    if (bannerPreview || bannerFile) {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerPreview(null);
      setBannerFile(null);
      return;
    }
    if (!user.bannerImage) return;
    const fd = new FormData();
    fd.append("removeBannerImage", "true");
    try {
      await updateProfile(fd);
      successToast("Banner removed");
    } catch (e) {
      errorToast("Failed to remove banner");
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 to-white px-4 py-8 md:py-10">
      <div className="mx-auto max-w-full space-y-6">
        {/* ── Hero card ─────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
          {/* Banner */}
          <div className="group relative h-52 sm:h-64">
            {bannerSrc ? (
              <Image
                src={bannerSrc}
                alt="Profile banner"
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 via-brand-primary to-indigo-600" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

            {/* Banner actions — camera pill + ⋮ dropdown (Facebook style) */}
            {bannerSrc ? (
              <div className="absolute right-4 top-4 z-20 opacity-0 transition group-hover:opacity-100">
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBannerMenuOpen((o) => !o);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur transition hover:bg-black/65"
                    title="Edit banner"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {bannerMenuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-11 z-30 w-56 origin-top-right rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-slate-900/5"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setBannerMenuOpen(false);
                          bannerInputRef.current?.click();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        <UploadCloud className="h-4 w-4" />
                        Upload new photo
                      </button>
                      <button
                        type="button"
                        onClick={removeBanner}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur transition hover:scale-[1.03] hover:bg-white"
                title="Add banner"
              >
                <ImagePlus className="h-4 w-4" />
                Add Banner
              </button>
            )}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={pickBanner}
            />

            {/* Pending change indicator */}
            {(profileFile || bannerFile) && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Pending changes
              </span>
            )}
          </div>

          {/* Identity */}
          <div className="relative flex flex-col gap-4 px-6 pb-8 pt-0 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="-mt-14 sm:-mt-16 relative">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-indigo-500 shadow-xl ring-4 ring-white">
                  {profileSrc ? (
                    <Image
                      src={profileSrc}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                      {initialsOf(user.name)}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-primary shadow-md ring-2 ring-white transition hover:scale-110 hover:bg-brand-primary hover:text-white"
                  title="Change profile photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={pickProfile}
                />
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="h4 text-slate-900">{user.name}</h1>
                  <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                    {roleLabel(user.role)}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {user.email}
                  </span>
                  {user.team?.name && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> {user.team.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.isActive === false
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
                }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${user.isActive === false ? "bg-red-500" : "bg-emerald-500"
                  }`}
              />
              {user.isActive === false ? "Inactive" : "Active"}
            </span>
          </div>
        </div>

        {/* ── Settings grid ─────────────────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Account settings */}
          <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <UserRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Account</h2>
                <p className="text-xs text-slate-500">Display name & photos</p>
              </div>
            </div>

            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Display name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
            />

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Role</p>
                <p className="mt-0.5 font-semibold text-slate-800">
                  {roleLabel(user.role)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Team</p>
                <p className="mt-0.5 font-semibold text-slate-800">
                  {user.team?.name ?? "—"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={saveProfile}
              disabled={!canSaveProfile || isUpdatingProfile}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition ${canSaveProfile && !isUpdatingProfile
                  ? "bg-brand-primary hover:bg-brand-primary-hover"
                  : "cursor-not-allowed bg-slate-300"
                }`}
            >
              {isUpdatingProfile ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isUpdatingProfile ? "Saving…" : "Save Changes"}
            </button>
          </section>

          {/* Change password */}
          <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <KeyRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Security</h2>
                <p className="text-xs text-slate-500">Change your password</p>
              </div>
            </div>

            <div className="space-y-3">
              <PasswordInput
                placeholder="Current password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordInput
                placeholder="New password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordInput
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {newPassword && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  { ok: newPassword.length >= 8, label: "8+ chars" },
                  { ok: /[A-Z]/.test(newPassword), label: "Uppercase" },
                  { ok: /[a-z]/.test(newPassword), label: "Lowercase" },
                  { ok: /[0-9]/.test(newPassword), label: "Number" },
                ].map((c) => (
                  <span
                    key={c.label}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${c.ok
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                      }`}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {c.label}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={savePassword}
              disabled={!newPassword || isUpdatingProfile}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${newPassword && !isUpdatingProfile
                  ? "bg-slate-900 text-white shadow-lg hover:bg-slate-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
            >
              {isUpdatingProfile ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              {isUpdatingProfile ? "Updating…" : "Update Password"}
            </button>
          </section>
        </div>

        {/* ── Account type footer ───────────────────────────────── */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/60 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <ShieldCheck className="h-5 w-5 text-brand-primary" />
            <span className="font-medium">{user.email}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Signed in as internal account</span>
          </div>
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:inline">
            {roleLabel(user.role)}
          </span>
        </div>
      </div>
    </div>
  );
}