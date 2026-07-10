"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openSidebar } from "../store/sidebarSlice";
import AuthGuard from "../components/AuthGuard";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProfileData {
  name: string;
  mobile: string;
  email: string;
}

// ── Confirmation modal ────────────────────────────────────────────────────────
const Modal = ({
  title,
  body,
  onClose,
  children,
}: {
  title: string;
  body?: string;
  onClose: () => void;
  children?: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.22 }}
      className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col gap-5 shadow-xl"
    >
      <h3 className="unageo text-[1.1rem] font-semibold leading-[1.5rem] text-center">{title}</h3>
      {body && (
        <p className="unageo-regular text-[0.875rem] text-[#616161] leading-[1.4rem] text-center">{body}</p>
      )}
      {children}
      <button
        onClick={onClose}
        className="w-full py-3 rounded-[2rem] border border-[#E0E0E0] unageo-regular text-[0.875rem] font-medium text-[#333] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
      >
        Cancel
      </button>
    </motion.div>
  </div>
);

// ── Input field helper ────────────────────────────────────────────────────────
const Field = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  editable = true,
}: {
  label: string;
  type?: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  editable?: boolean;
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="unageo-regular text-[0.75rem] text-[#A5A5A5]">{label}</label>
    <div className="flex items-center justify-between border border-[#E0E0E0] rounded-[2rem] px-4 h-[3rem]">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={!editable}
        className="flex-1 unageo-regular text-[0.875rem] text-[#333] bg-transparent focus:outline-none disabled:text-[#A5A5A5]"
      />
      {editable && onChange && (
        <svg className="w-4 h-4 text-[#A5A5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )}
    </div>
  </div>
);

// ── Account page ──────────────────────────────────────────────────────────────
const AccountPage = () => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);

  const [profile, setProfile] = useState<ProfileData>({ name: "", mobile: "", email: "" });
  const [password, setPassword] = useState("••••••••••");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states
  const [modal, setModal] = useState<
    "none" | "resetPassword" | "resetSent" | "changeEmail" | "emailSent" | "changePhone" | "phoneSent" | "deleteConfirm" | "deleteAccount"
  >("none");

  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // ── Fetch profile ───────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Try localStorage first for immediate display
        const raw = localStorage.getItem("dispatch_hub_user");
        if (raw) {
          const u = JSON.parse(raw);
          setProfile({
            name: u.name || u.fullName || "",
            mobile: u.phone || u.mobile || "",
            email: u.email || "",
          });
          if (u.avatar) setAvatarUrl(u.avatar);
        }
        // TODO: replace with real API call
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({ name: data.name ?? "", mobile: data.mobile ?? "", email: data.email ?? "" });
          if (data.avatar) setAvatarUrl(data.avatar);
          // Sync back to localStorage
          localStorage.setItem("dispatch_hub_user", JSON.stringify(data));
        }
      } catch {
        // Offline — show whatever is in localStorage
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ── Save profile ────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: PUT /api/profile with profile data
      await new Promise((r) => setTimeout(r, 800)); // remove when API is ready
      const raw = localStorage.getItem("dispatch_hub_user");
      const u = raw ? JSON.parse(raw) : {};
      localStorage.setItem("dispatch_hub_user", JSON.stringify({ ...u, ...profile }));
    } catch {
      // handle error
    } finally {
      setSaving(false);
    }
  };

  // ── Avatar upload ───────────────────────────────────────────────────────────
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result as string);
    reader.readAsDataURL(file);
    // TODO: upload to backend
  };

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <AuthGuard>
      <div
        className={`md:bg-[#FAFAFA] flex flex-col md:pr-8 w-full transition-all duration-500 ease-in-out min-h-screen ${
          isExpanded ? "md:pl-[16rem]" : "md:pl-20"
        }`}
      >
        <div className="flex flex-col lg:flex-row w-full gap-6 p-4 sm:p-6 md:p-8 unageo-regular">
          {/* ── Left: Profile picture ───────────────────────────────── */}
          <div className="flex flex-col items-start gap-4 w-full lg:w-[13rem] flex-shrink-0">
            <div className="flex items-center gap-2">
              <Image
                onClick={() => dispatch(openSidebar())}
                src="/delivery/icons/profile.png"
                alt="menu"
                className="w-8 h-8 md:hidden cursor-pointer"
                width={32}
                height={32}
              />
              <h2 className="text-[1.25rem] md:text-[2rem] font-semibold leading-tight">Account</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 w-full">
              <h3 className="text-[0.875rem] font-semibold">Profile Picture</h3>
              {/* Avatar */}
              <div className="relative w-[6rem] h-[6rem]">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="avatar" fill className="rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FE581C] to-[#ff8c63] flex items-center justify-center text-white text-2xl font-bold">
                    {initials || "?"}
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-[2rem] bg-[#FFF0EB] text-[#FE581C] text-[0.8rem] font-medium hover:bg-[#ffe0d5] transition-colors cursor-pointer w-full justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choose from gallery
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-[2rem] border border-[#E0E0E0] text-[#333] text-[0.8rem] font-medium hover:bg-[#F8F8F8] transition-colors cursor-pointer w-full justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Camera
              </button>
            </div>
          </div>

          {/* ── Right: Profile info + settings ─────────────────────── */}
          <div className="flex flex-col gap-4 w-full">
            {loading ? (
              <div className="flex items-center justify-center py-16 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            ) : (
              <>
                {/* Profile info */}
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
                  <h3 className="text-[1rem] font-semibold">Picture Information</h3>
                  <Field label="Name" value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} placeholder="Your full name" />
                  <Field label="Mobile" type="tel" value={profile.mobile} onChange={(v) => setProfile((p) => ({ ...p, mobile: v }))} placeholder="+234 000 000 0000" />
                  <Field label="Email" type="email" value={profile.email} editable={false} placeholder="your@email.com" />
                  <Field label="Password" type="password" value={password} editable={false} />

                  {/* Connect accounts */}
                  <div className="flex flex-col gap-2 pt-2">
                    <h4 className="text-[0.875rem] font-semibold text-[#333]">Connect Accounts</h4>
                    <div className="flex items-center gap-3">
                      {[
                        { src: "/google.svg", label: "Google" },
                        { src: "/delivery/icons/facebook.svg", label: "Facebook" },
                        { src: "/delivery/icons/apple.svg", label: "Apple" },
                      ].map(({ src, label }) => (
                        <button
                          key={label}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
                          title={`Connect ${label}`}
                        >
                          <Image src={src} alt={label} width={20} height={20} className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save */}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer disabled:opacity-60 mt-2"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                {/* Danger zone */}
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-3">
                  <h3 className="text-[1rem] font-semibold text-[#C62828]">Danger Zone</h3>
                  {[
                    { label: "Reset Password", action: () => setModal("resetPassword") },
                    { label: "Change Email Address", action: () => setModal("changeEmail") },
                    { label: "Change Phone Number", action: () => setModal("changePhone") },
                    { label: "Delete Account", action: () => setModal("deleteConfirm"), danger: true },
                  ].map(({ label, action, danger }) => (
                    <button
                      key={label}
                      onClick={action}
                      className={`w-full py-3 rounded-[2rem] unageo-regular text-[0.875rem] font-medium transition-colors cursor-pointer border ${
                        danger
                          ? "border-[#C62828] text-[#C62828] hover:bg-[#FFF5F5]"
                          : "border-[#E0E0E0] text-[#333] hover:bg-[#F8F8F8]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {/* Reset password */}
        {modal === "resetPassword" && (
          <Modal title="Reset Password" body="Are you sure you want to change your password?" onClose={() => setModal("none")}>
            <button
              onClick={() => { setModal("resetSent"); /* TODO: POST /api/auth/reset-password */ }}
              className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer"
            >
              Yes
            </button>
          </Modal>
        )}
        {modal === "resetSent" && (
          <Modal title="Reset Password" body="A reset password link has been sent to your email." onClose={() => setModal("none")}>
            <button onClick={() => setModal("none")} className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer">Close</button>
          </Modal>
        )}

        {/* Change email */}
        {modal === "changeEmail" && (
          <Modal title="Change email address" body="We will send a verification link to your new email address." onClose={() => setModal("none")}>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New email address"
              className="w-full border border-[#E0E0E0] rounded-[2rem] px-4 py-3 unageo-regular text-[0.875rem] focus:outline-none focus:border-[#FE581C]"
            />
            <button
              onClick={() => { setModal("emailSent"); /* TODO: POST /api/auth/change-email */ }}
              disabled={!newEmail.trim()}
              className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer disabled:opacity-50"
            >
              Continue
            </button>
          </Modal>
        )}
        {modal === "emailSent" && (
          <Modal title="Change email address" body="We sent an sms verification link to your new email address." onClose={() => setModal("none")}>
            <button onClick={() => setModal("none")} className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer">Close</button>
          </Modal>
        )}

        {/* Change phone */}
        {modal === "changePhone" && (
          <Modal title="Change phone number" body={`We sent an sms verification code to ${profile.mobile || "your number"}`} onClose={() => setModal("none")}>
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+234 000 000 0000"
              className="w-full border border-[#E0E0E0] rounded-[2rem] px-4 py-3 unageo-regular text-[0.875rem] focus:outline-none focus:border-[#FE581C]"
            />
            <button
              onClick={() => { setModal("phoneSent"); /* TODO: POST /api/auth/change-phone */ }}
              disabled={!newPhone.trim()}
              className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer disabled:opacity-50"
            >
              Continue
            </button>
          </Modal>
        )}
        {modal === "phoneSent" && (
          <Modal title="Change phone number" body="Verification code sent." onClose={() => setModal("none")}>
            <button onClick={() => setModal("none")} className="w-full py-3 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#f54708] transition-colors cursor-pointer">Close</button>
          </Modal>
        )}

        {/* Delete account */}
        {modal === "deleteConfirm" && (
          <Modal title="Delete Account" body="Are you sure you want to permanently delete your account? This action can't be undone." onClose={() => setModal("none")}>
            <button
              onClick={() => setModal("deleteAccount")}
              className="w-full py-3 rounded-[2rem] bg-[#C62828] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#a81f1f] transition-colors cursor-pointer"
            >
              Continue
            </button>
          </Modal>
        )}
        {modal === "deleteAccount" && (
          <Modal title="Delete Account" body="Your account has been permanently deleted." onClose={() => {
            setModal("none");
            localStorage.removeItem("dispatch_hub_token");
            localStorage.removeItem("dispatch_hub_user");
            window.location.href = "/";
          }}>
            <button
              onClick={() => {
                setModal("none");
                localStorage.removeItem("dispatch_hub_token");
                localStorage.removeItem("dispatch_hub_user");
                window.location.href = "/";
              }}
              className="w-full py-3 rounded-[2rem] bg-[#C62828] text-white unageo-regular text-[0.875rem] font-medium hover:bg-[#a81f1f] transition-colors cursor-pointer"
            >
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </AuthGuard>
  );
};

export default AccountPage;