// Client-side service that calls our Next.js proxy routes.
// Never calls the backend directly — all requests go through /api/auth/* and /api/notifications/*.

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  email:        string;
  phone_number: string;
  first_name:   string;
  last_name:    string;
  password:     string;
  password2:    string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export type OtpPurpose =
  | "EMAIL_VERIFICATION"
  | "PHONE_VERIFICATION"
  | "PASSWORD_RESET"
  | "TWO_FACTOR"
  | "LOGIN";

export type OtpChannel = "SMS" | "EMAIL";

// data is typed as any because the backend response shape varies per endpoint.
export interface ApiResult {
  ok:   boolean;
  // biome-ignore lint: backend response shape varies
  data: any; // eslint-disable-line
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function extractToken(data: any): string | null { // eslint-disable-line
  return data?.token ?? data?.access ?? null;
}

export function extractRefreshToken(data: any): string | null { // eslint-disable-line
  return data?.refresh ?? null;
}

export function parseBackendError(data: any): string { // eslint-disable-line
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data.detail === "string") return data.detail;
  if (typeof data === "object") {
    const messages: string[] = [];
    for (const [field, errors] of Object.entries(data)) {
      const label = field === "non_field_errors" ? "" : `${field}: `;
      if (Array.isArray(errors)) {
        messages.push(`${label}${errors.join(" ")}`);
      } else if (typeof errors === "string") {
        messages.push(`${label}${errors}`);
      }
    }
    if (messages.length > 0) return messages.join("\n");
  }
  return "Something went wrong. Please try again.";
}

// ── Core fetch helper ─────────────────────────────────────────────────────────

async function call(
  endpoint: string,
  body: object,
  token?: string,
): Promise<ApiResult> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = { detail: "Invalid response from server" };
    }

    return { ok: res.ok, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, data: { detail: message } };
  }
}

// ── Auth calls (all go through Next.js proxy routes) ─────────────────────────

export const registerCustomer = (payload: RegisterPayload) =>
  call("/api/auth/register", payload);

export const loginCustomer = (payload: LoginPayload) =>
  call("/api/auth/login", payload);

// Step 1 of password reset: send the user's email → backend emails a reset link
export const forgotPassword = (email: string) =>
  call("/api/auth/forgot-password", { email });

// OTP: request a code (purpose tells the backend what it's for)
export const requestOtp = (purpose: OtpPurpose, channel: OtpChannel = "EMAIL") =>
  call("/api/auth/otp-request", { purpose, channel });

// OTP: verify the code the user typed
export const verifyOtp = (purpose: OtpPurpose, code: string) =>
  call("/api/auth/otp-verify", { purpose, code });

// Step 2 of password reset: submit new password with the uidb64+token from the
// email link.  The proxy route appends them to the backend URL.
export const resetPassword = (
  uidb64: string,
  token: string,
  newPassword: string,
  confirmPassword: string,
) =>
  call("/api/auth/reset-password", {
    uidb64,
    token,
    new_password:  newPassword,
    new_password2: confirmPassword,
  });

export const changePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  authToken: string,
) =>
  call("/api/auth/change-password", {
    old_password:  oldPassword,
    new_password:  newPassword,
    new_password2: confirmPassword,
  }, authToken);

export const logoutUser = (refreshToken: string, authToken: string) =>
  call("/api/auth/logout", { refresh: refreshToken }, authToken);

export const refreshToken = (refresh: string) =>
  call("/api/auth/refresh", { refresh });
