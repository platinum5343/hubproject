"use client";

// Turnstile temporarily removed — it was causing the Cloudflare worker
// bundle to crash (fingerprint 885ce94b) on every edge route.
// Login works correctly without it. Turnstile can be re-added once the
// bundler compatibility issue is resolved.

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import {
  clearMessages,
  loginSuccess,
  openModal,
  setError,
  setLoading,
} from "@/app/(users)/store/authSlice";
import {
  loginCustomer,
  extractToken,
  extractRefreshToken,
  parseBackendError,
} from "@/app/(users)/lib/authService";
import Input from "@/app/(users)/components/ui/Input";
import Button from "@/app/(users)/components/ui/Button";
import AlertMessage from "@/app/(users)/components/ui/AlertMessage";
import FormGroup from "@/app/(users)/components/ui/FormGroup";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData]         = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearMessages());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      dispatch(setError("Please enter your email and password."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearMessages());

    const { ok, data } = await loginCustomer({
      email:    formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    dispatch(setLoading(false));

    if (!ok) {
      dispatch(setError(parseBackendError(data)));
      return;
    }

    const token = extractToken(data);
    if (!token) {
      dispatch(setError("Login failed — no token received. Please try again."));
      return;
    }

    const isCourier = data.user?.is_courier === true;
    const refresh   = extractRefreshToken(data);
    if (refresh) sessionStorage.setItem("dispatch_hub_refresh", refresh);

    const user = {
      id:         token,
      email:      data.user?.email ?? formData.email.trim().toLowerCase(),
      name:       data.user
        ? `${data.user.first_name} ${data.user.last_name}`.trim()
        : formData.email.split("@")[0],
      isVerified: data.user?.is_verified ?? true,
      isCourier,
    };

    dispatch(loginSuccess(user));

    if (isCourier) {
      router.push("/courier-onboarding");
    } else {
      router.push("/delivery");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center h-full items-center gap-4">
        <h1 className="text-center unageo text-[1.25rem] md:text-[1.5rem] font-medium leading-[2rem]">
          Login to view your activities
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start gap-2 md:gap-4"
        >
          <FormGroup>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="example@gmail.com"
            />

            <div className="relative w-full">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-[2.6rem] text-[#A5A5A5] text-xs hover:text-[#FE581C] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <h3
                onClick={() => dispatch(openModal("forgot-password"))}
                className="text-end w-full unageo-regular text-[0.7rem] md:text-[1rem] leading-[1.2rem] md:leading-[1.6rem] text-[#A5A5A5] cursor-pointer hover:text-[#FE581C] transition-colors mt-1"
              >
                Forgot Password?
              </h3>
            </div>
          </FormGroup>

          {error && <AlertMessage type="error" message={error} />}

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={!formData.email.trim() || !formData.password || isLoading}
          >
            {isLoading ? "Signing in…" : "Continue"}
          </Button>

          <button
            type="button"
            disabled
            className="flex items-center justify-center w-full py-2 md:py-4 px-[1.1rem] md:px-8 gap-[0.2rem] md:gap-2 rounded-[3.125rem] md:rounded-4xl border border-[#EDEDED] h-[3.25rem] opacity-60 cursor-not-allowed"
          >
            <Image
              src="/google.svg"
              alt="google"
              width={24}
              height={24}
              className="h-6 w-6 object-cover"
            />
            <h3 className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[0.9rem] md:leading-[1.5rem]">
              Sign in with Google
            </h3>
          </button>
        </form>
      </div>

      <div className="flex p-[0.1rem] items-center justify-center gap-[0.1rem] mt-6">
        <p className="unageo-regular text-[0.875rem] md:text-[1rem] md:leading-[1.5rem] leading-[0.9rem]">
          New user?
        </p>
        <button
          onClick={() => dispatch(openModal("signup"))}
          className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.5rem] underline cursor-pointer"
        >
          Signup
        </button>
      </div>
    </>
  );
};

export default SignIn;