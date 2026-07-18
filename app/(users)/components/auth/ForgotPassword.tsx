"use client";

import React, { useState } from "react";
import FormGroup from "../ui/FormGroup";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearMessages,
  openModal,
  setError,
  setLoading,
  setSuccess,
} from "../../store/authSlice";
import Button from "../ui/Button";
import BackButton from "../icons/auth-modal/BackButton";
import AlertMessage from "../ui/AlertMessage";
import { forgotPassword, parseBackendError } from "../../lib/authService";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, successMessage } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) dispatch(clearMessages());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    dispatch(setLoading(true));
    dispatch(clearMessages());

    const { ok, data } = await forgotPassword(email.trim().toLowerCase());
    dispatch(setLoading(false));

    if (!ok) {
      dispatch(setError(parseBackendError(data)));
      return;
    }

    // Useful during integration testing: lets us confirm backend actually responded.
    console.log("[ForgotPassword] forgotPassword success data:", data);

    // If backend sends a 200 but no mail arrives, the issue is backend mail delivery.
    // This log helps confirm the frontend never blocks sending.







    // Store email so OTP screen knows which address to show
    sessionStorage.setItem("dispatch_hub_reset_email", email.trim().toLowerCase());

    const backendMessage = typeof data?.message === "string" ? data.message : null;
    dispatch(
      setSuccess(
        backendMessage
          ? `${backendMessage}. Open the link from your email to set a new password.`
          : "Password reset email sent. Open the link from your email to set a new password."
      )
    );
    // Backend reset-password confirms via uidb64+token from the email link.
    // Therefore, we do not open OTP verification here to avoid confusion.

  };

  const handleBack = () => {
    dispatch(openModal("signin"));
  };

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-center text-[#616161] text-[1.5rem] font-medium leading-8">
          Forgot Password
        </h1>
        <div className="flex flex-col items-start gap-16 w-full">
          <FormGroup>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Enter email to recover password"
            />

            {error && <AlertMessage type="error" message={error} />}
            {successMessage && <AlertMessage type="success" message={successMessage} />}

            <Button
              fullWidth
              onClick={handleSubmit}
              className="mt-6"
              isLoading={isLoading}
              disabled={!email.trim() || isLoading}
            >
              Continue
            </Button>
          </FormGroup>

          <Button
            fullWidth
            variant="secondary"
            icon={<BackButton />}
            iconPosition="left"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
