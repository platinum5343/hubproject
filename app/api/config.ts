// Single source of truth for backend URLs used by all edge proxy routes.
//
// WHY THIS FILE AND NOT app/(users)/lib/apiConfig.ts:
// Every route.ts with `export const runtime = "edge"` is bundled by
// Cloudflare's worker bundler — NOT the standard Next.js compiler.
// The @/ path alias is injected by Next.js and the Cloudflare bundler
// has no knowledge of it. The module resolves to undefined and crashes:
//   TypeError: Cannot read properties of undefined (reading 'default')
//
// Relative imports work in every bundler. Since all routes live at
// app/api/<group>/<name>/route.ts, the relative path is always "../../config".
//
// To change the backend URL: edit BACKEND here. Every route updates.
// app/(users)/lib/apiConfig.ts still exists for client-side code.

export const BACKEND = "https://backend.dispatchhub.org/api";

export const API = {
  // Auth
  LOGIN:                  `${BACKEND}/user/login/`,
  CUSTOMER_SIGNUP:        `${BACKEND}/user/customer-signup/`,
  COURIER_SIGNUP:         `${BACKEND}/user/courier-signup/`,
  TOKEN_REFRESH:          `${BACKEND}/user/token/refresh/`,
  LOGOUT:                 `${BACKEND}/user/logout/`,
  FORGOT_PASSWORD:        `${BACKEND}/user/request-password-reset/`,
  RESET_PASSWORD_CONFIRM: `${BACKEND}/user/password-reset-confirm/`,
  CHANGE_PASSWORD:        `${BACKEND}/user/change-password/`,
  OTP_REQUEST:            `${BACKEND}/notifications/otp/request/`,
  OTP_VERIFY:             `${BACKEND}/notifications/otp/verify/`,
  // Delivery
  JOBS_LIST:              `${BACKEND}/delivery/jobs/`,
  JOBS_SCHEDULED:         `${BACKEND}/delivery/jobs/scheduled/`,
  JOBS_RECEIVED:          `${BACKEND}/delivery/jobs/received/`,
  JOBS_CREATE:            `${BACKEND}/delivery/jobs/create/`,
  PRICE_ESTIMATE:         `${BACKEND}/delivery/price-estimate/`,
  // Notifications
  NOTIFICATIONS:          `${BACKEND}/notifications/`,
} as const;

// Standard headers for every proxied POST request.
// Origin: satisfies Django CORS check.
// X-Requested-With: tells DRF this is an AJAX call, skips session CSRF.
export const PROXY_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Origin": "https://dispatchhub.org",
  "X-Requested-With": "XMLHttpRequest",
};