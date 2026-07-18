import {
  clearMessages,
  openModal,
  setError,
  setLoading,
  setSignupStep2Data,
  SignupStep2Data,
  goBackToStep1,
  setSuccess,
  loginSuccess,
  clearSignupData,
} from "@/app/(users)/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import { useState } from "react";
import Input from "@/app/(users)/components/ui/Input";
import Button from "@/app/(users)/components/ui/Button";
import GoogleButton from "@/app/(users)/components/ui/GoogleButton";
import AlertMessage from "@/app/(users)/components/ui/AlertMessage";
import FormGroup from "@/app/(users)/components/ui/FormGroup";
import {
  registerCourier,
  extractToken,
  parseBackendError,
} from "@/app/(users)/lib/authService";

const CourierSignup2 = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, successMessage, courierSignup } = useAppSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      dispatch(clearMessages());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courierSignup.step1Data) {
      dispatch(setError("Please go back and fill the form"));
      return;
    }

    const step2Data: SignupStep2Data = {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (step2Data.password.length < 8) {
      dispatch(setError("Password must be at least 8 characters."));
      return;
    }
    if (step2Data.password !== step2Data.confirmPassword) {
      dispatch(setError("Passwords do not match."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearMessages());

    dispatch(setSignupStep2Data({ type: "courier", data: step2Data }));

    // Backend expects first_name/last_name + email + password.
    const nameParts = (courierSignup.step1Data.fullName ?? "").trim().split(/\s+/);
    const first_name = nameParts[0] ?? "";
    const last_name = nameParts.slice(1).join(" ") || first_name;

    // Backend for courier signup appears to require phone_number (see backend validation error).
    // Your UI step1 stores it as courierSignup.step1Data.phoneNumber.
    const payload: any = {
      email: courierSignup.step1Data.email,
      first_name,
      last_name,
      phone_number: courierSignup.step1Data.phoneNumber,
      password: step2Data.password,
      password2: step2Data.confirmPassword,
    };

    try {
      const { ok, data } = await registerCourier(payload);
      dispatch(setLoading(false));

      if (!ok) {
        dispatch(setError(parseBackendError(data)));
        return;
      }

      const token = extractToken(data);
      const user = {
        id: token ?? data.user?.id ?? data.email ?? courierSignup.step1Data.email,
        email: data.user?.email ?? courierSignup.step1Data.email,
        name: data.user
          ? `${data.user.first_name} ${data.user.last_name}`.trim()
          : courierSignup.step1Data.fullName,
        isVerified: data.user?.is_verified ?? false,
        isCourier: true,
      };

      if (token) {
        dispatch(loginSuccess({ ...user, id: token }));
      }

      const isVerified = Boolean(data.user?.is_verified ?? user.isVerified);
      if (!isVerified) {
        dispatch(setSuccess("Courier account created. Please verify your email."));
        dispatch(clearSignupData("courier"));

        // Backend email verification is link-based (confirm-email/<uidb64>/<token>/),
        // not a 4-digit OTP. So we should not open the OTP input modal here.
        dispatch(openModal(null));

        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);

          // Backend courier signup triggers email verification first.
          // If phone verification is also required, it should be handled via the next OTP purpose.
          url.searchParams.set("purpose", "EMAIL_VERIFICATION");

          window.history.replaceState({}, "", url.toString());
        }
        return;
      }

      dispatch(setSuccess("Courier account created successfully!"));
      dispatch(clearSignupData("courier"));

      // Courier verification completion is handled by courier documents onboarding.
      dispatch(openModal(null));
    } catch (err: any) {
      dispatch(setLoading(false));
      dispatch(setError(String(err?.message ?? err) || "An Error Occurred. Please try again"));
    }
  };

  const handleBack = () => {
    dispatch(goBackToStep1("courier"));
  };

  if (!courierSignup.step1Data) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-6">
            Step 1 data is missing. Please start over.
          </p>
          <Button onClick={handleBack} variant="primary">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-center unageo text-[1.25rem] md:text-[1.5rem] font-medium leading-[2rem] md:w-[21.25rem]">
        Signup as a rider to start earning
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-start gap-2 md:gap-4"
      >
        <FormGroup>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            placeholder="******"
            helperText="Must be at least 8 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
            placeholder="*******"
            helperText="Password must match"
          />
        </FormGroup>

        {error && <AlertMessage type="error" message={error} />}
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            variant="secondary"
            className="flex-1"
          >
            Back
          </Button>

          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>

        <GoogleButton />
      </form>

      <div className="flex p-[0.1rem] items-center gap-[0.1rem] mt-6">
        <p className="unageo-regular text-[0.875rem] md:text-[1rem] md:leading-[1.5rem] leading-[0.9rem]">
          Already have an account?
        </p>
        <button
          onClick={() => dispatch(openModal("signin"))}
          className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[1.25rem] md:leading-[1.5rem] underline"
        >
          Login
        </button>
      </div>

      <p className="unageo-regular text-[#808080] text-center md:text-[0.875rem] md:leading-[1.25rem]">
        By proceeding, you consent to get calls, WhatsApp or SMS messages,
        including by automated means, from DispatchHub and its affiliates to the
        number provided.
      </p>
    </div>
  );
};

export default CourierSignup2;
