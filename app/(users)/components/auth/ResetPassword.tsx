"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FormGroup from "../ui/FormGroup";
import AlertMessage from "../ui/AlertMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearMessages,
  openModal,
  setError,
  setLoading,
  setSuccess,
} from "../../store/authSlice";
import { resetPassword, parseBackendError } from "../../lib/authService";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, successMessage } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    newPassword:     "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearMessages());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      dispatch(setError("Passwords do not match."));
      return;
    }
    if (formData.newPassword.length < 8) {
      dispatch(setError("Password must be at least 8 characters."));
      return;
    }

    // The uidb64 and token come from the URL params when the user clicks the
    // email link (e.g. /reset-password?uidb64=xxx&token=yyy).
    // If this modal is shown after an OTP flow instead, pass the stored OTP.
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const uidb64 = params.get("uidb64") ?? "";
    const token  = params.get("token")  ?? "";

    if (!uidb64 || !token) {
      dispatch(setError("Invalid or expired reset link. Use the link from your email to set a new password."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearMessages());

    const { ok, data } = await resetPassword(
      uidb64,
      token,
      formData.newPassword,
      formData.confirmPassword,
    );
    dispatch(setLoading(false));

    if (!ok) {
      dispatch(setError(parseBackendError(data)));
      return;
    }

    dispatch(setSuccess("Password reset successfully! You can now sign in."));
    setTimeout(() => dispatch(openModal("signin")), 1500);
  };

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <h1 className="text-[1.5rem] font-medium leading-8 text-[#616161] text-center">
          Choose your new password
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <FormGroup>
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="••••••••"
              helperText="Must be at least 8 characters"
            />
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="••••••••"
              helperText="Password must match"
            />

            {error && <AlertMessage type="error" message={error} />}
            {successMessage && <AlertMessage type="success" message={successMessage} />}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={!formData.newPassword || !formData.confirmPassword || isLoading}
            >
              Confirm
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
