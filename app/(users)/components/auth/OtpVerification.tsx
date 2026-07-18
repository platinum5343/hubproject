"use client";

import React, { useState } from "react";
import OtpInput from "../ui/OtpInput";
import Button from "../ui/Button";
import AlertMessage from "../ui/AlertMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearMessages,
  openModal,
  setError,
  setLoading,
  setSuccess,
} from "../../store/authSlice";
import {
  verifyOtp,
  requestOtp,
  parseBackendError,
} from "../../lib/authService";

const OtpVerification = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, successMessage } = useAppSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (error) dispatch(clearMessages());
  };

type OtpPurpose =
  | "EMAIL_VERIFICATION"
  | "PHONE_VERIFICATION"
  | "PASSWORD_RESET"
  | "TWO_FACTOR"
  | "LOGIN";

const getPurposeFromUrl = (): OtpPurpose => {
  if (typeof window === "undefined") return "PASSWORD_RESET";
  const params = new URLSearchParams(window.location.search);
  const purpose = (params.get("purpose") ?? "PASSWORD_RESET") as OtpPurpose;
  return purpose;
};

const handleContinue = async () => {
    if (otp.length !== 4) return;

    const purpose = getPurposeFromUrl();

    dispatch(setLoading(true));
    dispatch(clearMessages());

    const { ok, data } = await verifyOtp(purpose, otp);
    dispatch(setLoading(false));

    if (!ok) {
      dispatch(setError(parseBackendError(data)));
      return;
    }

    // For password reset, backend uses uidb64+token from the email link.
    if (purpose === "PASSWORD_RESET") {
      dispatch(setError("Use the password reset link sent to your email."));
      return;
    }

    // For email/phone verification flows, we consider OTP verification successful.
    dispatch(setSuccess("Verification successful. You can continue."));
    if (purpose === "EMAIL_VERIFICATION" || purpose === "PHONE_VERIFICATION") {
      // Courier signup flow expects to continue to courier onboarding/doc verification.
      // If you want a different destination, update the href below.
      setTimeout(() => {
        dispatch(openModal(null));
        try {
          window.location.href = "/courier-onboarding";
        } catch {
          dispatch(openModal("signin"));
        }
      }, 800);
    }
  };

  const handleResend = async () => {
    dispatch(setLoading(true));
    dispatch(clearMessages());

    const purpose = getPurposeFromUrl();

    // Channel selection: email OTPs for EMAIL_VERIFICATION/PASSWORD_RESET by default.
    // Phone OTPs for PHONE_VERIFICATION.
    const channel = purpose === "PHONE_VERIFICATION" ? "SMS" : "EMAIL";

    const { ok, data } = await requestOtp(purpose, channel as any);
    dispatch(setLoading(false));

    if (!ok) {
      dispatch(setError(parseBackendError(data)));
    } else {
      dispatch(
        setSuccess(
          purpose === "PHONE_VERIFICATION"
            ? "A new code has been sent to your phone."
            : "A new code has been sent to your email."
        )
      );
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex p-4 flex-col items-center gap-6 w-full">
        <div className="w-full flex py-1 flex-col items-center gap-1">
          <h1 className="text-[#616161] text-[1.5rem] font-medium leading-8">
            OTP Verification
          </h1>
          <h2 className="text-[#616161] text-[1rem] leading-[1.25rem] text-center">
            Enter the 4 digit code sent to your email
          </h2>
        </div>

        <OtpInput
          length={4}
          onChange={handleOtpChange}
          onComplete={handleContinue}
        />

        {error && <AlertMessage type="error" message={error} />}
        {successMessage && <AlertMessage type="success" message={successMessage} />}

        <div className="flex flex-col gap-4 w-full mt-4">
          <Button
            fullWidth
            onClick={handleContinue}
            isLoading={isLoading}
            disabled={otp.length !== 4 || isLoading}
          >
            Continue
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-[#FE581C] text-[1rem] font-medium hover:underline transition-all disabled:opacity-50"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
