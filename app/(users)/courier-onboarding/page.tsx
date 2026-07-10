"use client";
export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ── Document slot config ──────────────────────────────────────────────────────
const DOCUMENT_SLOTS = [
  { key: "vehicle_photo",          label: "Photo of Vehicle" },
  { key: "registration_plate",     label: "Registration Plate" },
  { key: "registration_cert",      label: "Registration Certificate" },
  { key: "selfie_license_front",   label: "Selfie with driver's license (Front)" },
  { key: "drivers_license_front",  label: "Driver's License (Front)" },
  { key: "drivers_license_back",   label: "Driver's License (Back)" },
  { key: "registration_cert_2",    label: "Registration Certificate" },
  { key: "selfie_license_back",    label: "Selfie with driver's license (Back)" },
] as const;

type DocKey = (typeof DOCUMENT_SLOTS)[number]["key"];
type UploadStatus = "idle" | "uploading" | "success" | "failed";

interface DocState {
  status: UploadStatus;
  preview: string | null;
  file:    File | null;
}

// ── Upload slot component ─────────────────────────────────────────────────────
const DocSlot = ({
  label,
  state,
  onSelect,
  onRetry,
}: {
  label:    string;
  state:    DocState;
  onSelect: (file: File) => void;
  onRetry:  () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[0.75rem] text-[#616161] unageo-regular">{label}</p>
      <div
        onClick={() => state.status === "idle" && inputRef.current?.click()}
        className={`relative w-full h-[4.5rem] sm:h-[5.5rem] rounded-lg border-[1.5px] border-dashed flex items-center justify-center cursor-pointer transition-colors overflow-hidden
          ${state.status === "failed"  ? "border-red-400 bg-red-50" :
            state.status === "success" ? "border-green-400 bg-green-50" :
            state.status === "uploading" ? "border-[#FE581C]/50 bg-[#FFF8F6]" :
            "border-[#D0D0D0] bg-[#FAFAFA] hover:border-[#FE581C]"}`}
      >
        {/* Preview image */}
        {state.preview && state.status === "success" && (
          <Image src={state.preview} alt={label} fill className="object-cover" />
        )}

        {/* Uploading state */}
        {state.status === "uploading" && (
          <div className="flex flex-col items-center gap-1 px-2">
            <div className="w-8 h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div className="h-full bg-[#FE581C] rounded-full animate-[progress_1.5s_ease-in-out_infinite]" style={{ width: "60%" }} />
            </div>
            <p className="text-[0.65rem] text-[#FE581C] unageo-regular">Uploading</p>
          </div>
        )}

        {/* Success tick */}
        {state.status === "success" && !state.preview && (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Success overlay tick when preview exists */}
        {state.status === "success" && state.preview && (
          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Failed state */}
        {state.status === "failed" && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-[0.65rem] text-red-500 unageo-regular">Upload failed.</p>
            <button
              onClick={(e) => { e.stopPropagation(); onRetry(); }}
              className="text-[0.65rem] text-[#FE581C] underline unageo-regular cursor-pointer"
            >
              Click to try again
            </button>
          </div>
        )}

        {/* Idle — plus icon */}
        {state.status === "idle" && (
          <svg className="w-5 h-5 text-[#C0C0C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CourierOnboarding() {
  const router = useRouter();
  const [docs, setDocs] = useState<Record<DocKey, DocState>>(() =>
    Object.fromEntries(
      DOCUMENT_SLOTS.map(({ key }) => [
        key,
        { status: "idle", preview: null, file: null } satisfies DocState,
      ]),
    ) as Record<DocKey, DocState>,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not a courier
  useEffect(() => {
    const raw = localStorage.getItem("dispatch_hub_user");
    if (!raw) { router.replace("/"); return; }
    try {
      const user = JSON.parse(raw);
      if (!user.isCourier) router.replace("/delivery");
    } catch { router.replace("/"); }
  }, [router]);

  const setDocState = (key: DocKey, patch: Partial<DocState>) =>
    setDocs((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  // Simulate upload — replace with real API call when backend is ready
  const handleSelect = async (key: DocKey, file: File) => {
    setError(null);
    setDocState(key, { status: "uploading", file });

    const preview = file.type.startsWith("image/")
      ? await new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(file);
        })
      : null;

    // TODO: replace with actual upload to /api/courier/documents/upload/
    await new Promise((res) => setTimeout(res, 1500));
    setDocState(key, { status: "success", preview });
  };

  const handleRetry = (key: DocKey) =>
    setDocState(key, { status: "idle", preview: null, file: null });

  const uploadedCount = Object.values(docs).filter((d) => d.status === "success").length;
  const canContinue   = uploadedCount >= 4; // require at least 4 docs

  const handleContinue = async () => {
    if (!canContinue) {
      setError("Please upload at least 4 documents to continue.");
      return;
    }
    setSubmitting(true);
    // TODO: POST all docs to backend, then redirect to a "pending review" page
    await new Promise((res) => setTimeout(res, 800));
    setSubmitting(false);
    // For now, just show a success message
    alert("Documents submitted! You will receive an email once your account is verified.");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-20 py-4 bg-white border-b border-[#F0F0F0] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="logo" width={40} height={28} className="w-8 h-6" />
          <span className="unageo font-bold text-[1.2rem]">Dispatch Hub</span>
        </Link>
        <div className="flex items-center gap-2 text-sm unageo-regular text-[#FE581C]">
          <div className="w-2 h-2 rounded-full bg-[#FE581C]" />
          Document Upload
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 bg-white">
        {/* Header */}
        <div className="text-center mb-8 max-w-[36rem]">
          <h1 className="unageo text-[1.5rem] md:text-[2rem] font-bold leading-tight mb-2">
            Upload the following documents
          </h1>
          <p className="unageo-regular text-[0.875rem] text-[#616161] leading-[1.4rem]">
            Your information is critical to proceed with your application and ensure
            the security and compliance of our platform.
          </p>
        </div>

        {/* Document grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[52rem] mb-6">
          {DOCUMENT_SLOTS.map(({ key, label }) => (
            <DocSlot
              key={key}
              label={label}
              state={docs[key]}
              onSelect={(file) => handleSelect(key, file)}
              onRetry={() => handleRetry(key)}
            />
          ))}
        </div>

        {/* Helper text */}
        <p className="unageo-regular text-[0.75rem] text-[#A5A5A5] mb-6">
          Click to upload or drag and drop PDF or JPG (max. 25mb)
        </p>

        {/* Progress */}
        <p className="unageo-regular text-[0.8rem] text-[#616161] mb-4">
          {uploadedCount} of {DOCUMENT_SLOTS.length} documents uploaded
        </p>

        {error && (
          <p className="text-red-500 text-sm unageo-regular mb-4">{error}</p>
        )}

        {/* Actions */}
        <button
          onClick={handleContinue}
          disabled={!canContinue || submitting}
          className={`w-full max-w-[24rem] py-4 rounded-[2.5rem] text-white unageo-regular font-medium text-[1rem] transition-all duration-300 ${
            canContinue && !submitting
              ? "bg-[#FE581C] hover:bg-[#f54708] cursor-pointer"
              : "bg-[#FE581C]/50 cursor-not-allowed"
          }`}
        >
          {submitting ? "Submitting…" : "Continue"}
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-4 flex items-center gap-1 text-[#FE581C] unageo-regular text-sm cursor-pointer hover:opacity-70"
        >
          <div className="w-4 h-4 rounded-full bg-[#FE581C] flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          Back
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white px-6 md:px-20 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={32} height={22} className="brightness-0 invert" />
            <span className="unageo font-bold text-[1rem] tracking-widest">DISPATCH HUB</span>
          </div>
          <div className="flex gap-3">
            {["instagram", "facebook", "twitter", "linkedin"].map((s) => (
              <div key={s} className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-[#FE581C] cursor-pointer transition-colors" />
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[0.75rem] text-[#A5A5A5] unageo-regular">
          <div>
            <p>Hours: Monday to Friday, 8:00 AM – 6:00 PM;</p>
            <p>Saturday, 9:00 AM – 4:00 PM</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span className="hover:text-white cursor-pointer">Cookies</span>
            <span className="hover:text-white cursor-pointer">Security</span>
            <p className="w-full text-right">© 2024 Dispatch Hub</p>
          </div>
        </div>
      </footer>
    </div>
  );
}