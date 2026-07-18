import {
  clearMessages,
  clearSignupData,
  goBackToStep1,
  openModal,
  setError,
  setLoading,
  setSuccess,
  loginSuccess,
} from "@/app/(users)/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/(users)/components/ui/Input";
import Button from "@/app/(users)/components/ui/Button";
import GoogleButton from "@/app/(users)/components/ui/GoogleButton";
import AlertMessage from "@/app/(users)/components/ui/AlertMessage";
import FormGroup from "@/app/(users)/components/ui/FormGroup";
import {
  registerCustomer,
  extractToken,
  parseBackendError,
} from "@/app/(users)/lib/authService";

const DeliverySignup2 = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, successMessage, deliverySignup } = useAppSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearMessages());
  };

  const handleBack = () => dispatch(goBackToStep1("delivery"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliverySignup.step1Data) {
      dispatch(setError("Session expired. Please start over."));
      dispatch(goBackToStep1("delivery"));
      return;
    }

    // Client-side validation
    if (formData.password.length < 8) {
      dispatch(setError("Password must be at least 8 characters."));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      dispatch(setError("Passwords do not match."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearMessages());

    // Split "FirstName LastName" back into separate fields for the API
    const nameParts = deliverySignup.step1Data.fullName.trim().split(/\s+/);
    const first_name = nameParts[0] ?? "";
    const last_name  = nameParts.slice(1).join(" ") || first_name; // fallback if single name

    // Customer signup API (backend /user/customer-signup/) in this repo expects:
    // email, first_name, last_name, phone_number.
    // If backend also accepts passwords, that can be added later.
    const payload = {
      email: deliverySignup.step1Data.email,
      phone_number: deliverySignup.step1Data.phoneNumber,
      first_name,
      last_name,

      // Backend expects password + password2 at this endpoint
      password: formData.password,
      password2: formData.confirmPassword,
    } as any;

    console.log("[DeliverySignup2] payload:", {
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
      hasPassword: Boolean((payload as any).password),
      hasPassword2: Boolean((payload as any).password2),
    });

    const { ok, data } = await registerCustomer(payload);
    console.log("[DeliverySignup2] ok/data:", { ok, data });
    dispatch(setLoading(false));

    if (!ok) {
      const backendErr = parseBackendError(data);
      console.log("[DeliverySignup2] parseBackendError(data):", backendErr);
    }

    if (!ok) {
      const backendErr = parseBackendError(data);

      // If the backend says the email already exists, treat this as a normal
      // "account exists" situation: send the user to Login instead of
      // keeping them on the password-creation step.
      const errLower = backendErr.toLowerCase();

      // Handle “email already exists” robustly.
      // Django patterns we may see:
      // - "email: A user with this email already exists."
      // - "A user with this email already exists."
      // - field errors keyed as email/non_field_errors
      const looksLikeEmailExists = (
        (errLower.includes("email") && errLower.includes("already") && errLower.includes("exist")) ||
        (errLower.includes("already") && errLower.includes("exist"))
      );

      if (looksLikeEmailExists) {
        const msg = "An account with this email already exists. Please login instead.";
        // Show on UI immediately
        dispatch(setError(msg));
        dispatch(openModal("signin"));
        dispatch(setLoading(false));

        // Ensure the user sees the message even after modal switch.
        setTimeout(() => dispatch(setError(msg)), 0);
        return;
      }




      // For other 400s (invalid password/phone/email validation, missing fields, etc.),
      // show the exact backend error so the user isn't redirected incorrectly.
      dispatch(setError(backendErr));
      return;
    }

    // Registration succeeded — backend returns tokens but may set is_verified=false.
    const token = extractToken(data);
    const user = {
      id: token ?? data.user?.id ?? data.email ?? deliverySignup.step1Data.email,
      email: data.user?.email ?? deliverySignup.step1Data.email,
      name: data.user
        ? `${data.user.first_name} ${data.user.last_name}`.trim()
        : deliverySignup.step1Data.fullName,
      isVerified: data.user?.is_verified ?? false,
    };

    if (token) {
      dispatch(loginSuccess({ ...user, id: token }));
    }

    const isVerified = Boolean(data.user?.is_verified ?? user.isVerified);

    if (!isVerified) {
      // Backend requires email verification.
      // Show OTP verification modal and ask user to verify email.
      dispatch(setSuccess("Account created. Please verify your email."));
      dispatch(clearSignupData("delivery"));
      dispatch(openModal("otp-verification"));
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("purpose", "EMAIL_VERIFICATION");
        window.history.replaceState({}, "", url.toString());
      }
      return;
    }

    dispatch(setSuccess("Account created successfully! Welcome to Dispatch Hub."));
    dispatch(clearSignupData("delivery"));

    // Redirect to dashboard after a brief success flash
    setTimeout(() => {
      router.push("/delivery");
    }, 1000);
  };

  if (!deliverySignup.step1Data) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Session Expired</h2>
        <p className="text-gray-600 mb-6">Please start over.</p>
        <Button onClick={handleBack} variant="primary">Start Over</Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-center unageo text-[1.25rem] md:text-[1.5rem] font-medium leading-[2rem] md:w-[21.25rem]">
        Almost there — create your password
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
            placeholder="••••••••"
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
            placeholder="••••••••"
            helperText="Passwords must match"
          />
        </FormGroup>

        {error && <AlertMessage type="error" message={error} />}
        {successMessage && <AlertMessage type="success" message={successMessage} />}

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
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {isLoading ? "Creating Account…" : "Create Account"}
          </Button>
        </div>

        <GoogleButton />
      </form>

      <div className="flex p-[0.1rem] items-center gap-[0.1rem] mt-6">
        <p className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[0.9rem]">
          Already have an account?
        </p>
        <button
          onClick={() => dispatch(openModal("signin"))}
          className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[1.25rem] underline cursor-pointer"
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

export default DeliverySignup2;