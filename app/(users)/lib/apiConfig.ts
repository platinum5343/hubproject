// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the backend base URL.
// Change BACKEND_BASE_URL here and every proxy route updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

// IMPORTANT: Must be HTTPS on the live site — HTTP causes mixed-content errors
// which browsers silently block when the frontend is served over HTTPS.
export const BACKEND_BASE_URL = "https://backend.dispatchhub.org/api";

export const ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  CUSTOMER_SIGNUP:            `${BACKEND_BASE_URL}/user/customer-signup/`,
  COURIER_SIGNUP:             `${BACKEND_BASE_URL}/user/courier-signup/`,
  LOGIN:                      `${BACKEND_BASE_URL}/user/login/`,
  LOGIN_REFRESH:              `${BACKEND_BASE_URL}/user/token/refresh/`,   // was: /user/login/refresh/ (did not exist)
  LOGOUT:                     `${BACKEND_BASE_URL}/user/logout/`,

  // Password reset — two-step: request email link, then confirm with token in URL
  FORGOT_PASSWORD:            `${BACKEND_BASE_URL}/user/request-password-reset/`,        // was: /user/forgot-password/ (did not exist)
  RESET_PASSWORD_CONFIRM:     `${BACKEND_BASE_URL}/user/password-reset-confirm/`,         // was: /user/reset-password/ (did not exist) — append {uidb64}/{token}/ at call site

  // OTP — request sends a code, verify confirms it
  OTP_REQUEST:                `${BACKEND_BASE_URL}/notifications/otp/request/`,           // was: /user/verify-otp/ (did not exist)
  OTP_VERIFY:                 `${BACKEND_BASE_URL}/notifications/otp/verify/`,            // was: same wrong path

  // Email verification
  EMAIL_VERIFICATION_REQUEST: `${BACKEND_BASE_URL}/notifications/email-verification/request/`,
  EMAIL_VERIFICATION_VERIFY:  `${BACKEND_BASE_URL}/notifications/email-verification/verify/`,
  RESEND_VERIFICATION_EMAIL:  `${BACKEND_BASE_URL}/user/resend-verification-email/`,

  // Account
  CHANGE_PASSWORD:            `${BACKEND_BASE_URL}/user/change-password/`,
  SEND_PHONE_OTP:             `${BACKEND_BASE_URL}/user/send-phone-otp/`,
  VERIFY_PHONE_OTP:           `${BACKEND_BASE_URL}/user/verify-phone-otp/`,

  // ── Delivery jobs ─────────────────────────────────────────────────────────
  JOBS_CREATE:                `${BACKEND_BASE_URL}/delivery/jobs/create/`,
  JOBS_LIST:                  `${BACKEND_BASE_URL}/delivery/jobs/`,
  JOBS_SCHEDULED:             `${BACKEND_BASE_URL}/delivery/jobs/scheduled/`,
  JOBS_RECEIVED:              `${BACKEND_BASE_URL}/delivery/jobs/received/`,
  JOB_DETAIL:                 `${BACKEND_BASE_URL}/delivery/jobs/`,                       // append {job_id}/ at call site
  JOB_EDIT:                   `${BACKEND_BASE_URL}/delivery/jobs/`,                       // append {job_id}/edit/ at call site
  JOB_SHARE:                  `${BACKEND_BASE_URL}/delivery/jobs/`,                       // append {job_id}/share/ at call site
  PRICE_ESTIMATE:             `${BACKEND_BASE_URL}/delivery/price-estimate/`,

  // ── Notifications ─────────────────────────────────────────────────────────
  NOTIFICATIONS:              `${BACKEND_BASE_URL}/notifications/`,                       // was: /user/notifications/ (did not exist)
  NOTIFICATIONS_UNREAD_COUNT: `${BACKEND_BASE_URL}/notifications/unread_count/`,
  NOTIFICATIONS_MARK_READ:    `${BACKEND_BASE_URL}/notifications/mark_read/`,
  NOTIFICATION_DETAIL:        `${BACKEND_BASE_URL}/notifications/`,                       // append {id}/ at call site

  // ── Payments ──────────────────────────────────────────────────────────────
  PAYMENTS_CARDS:             `${BACKEND_BASE_URL}/payments/cards/`,
  PAYMENTS_CASH_INITIATE:     `${BACKEND_BASE_URL}/payments/cash/initiate/`,
  PAYMENTS_CASH_CONFIRM:      `${BACKEND_BASE_URL}/payments/cash/confirm/`,
  PAYMENTS_WALLET_INITIATE:   `${BACKEND_BASE_URL}/payments/wallet/initiate/`,
  PAYMENTS_BANK_INITIATE:     `${BACKEND_BASE_URL}/payments/bank-transfer/initiate/`,
  PAYMENTS_STATUS:            `${BACKEND_BASE_URL}/payments/status/`,
  PAYMENTS_REPAY_DEBT:        `${BACKEND_BASE_URL}/payments/repay-debt/`,

  // ── Media uploads ─────────────────────────────────────────────────────────
  MEDIA_REQUEST_UPLOAD_URL:   `${BACKEND_BASE_URL}/media/request-upload-url/`,
  MEDIA_CONFIRM_UPLOAD:       `${BACKEND_BASE_URL}/media/confirm-upload/`,
  MEDIA_MY_UPLOADS:           `${BACKEND_BASE_URL}/media/my-uploads/`,
  MEDIA_UPLOAD_STATUS:        `${BACKEND_BASE_URL}/media/status/`,                        // append {upload_id}/ at call site

  // ── Chat & Calls ──────────────────────────────────────────────────────────
  CHAT_ROOMS:                 `${BACKEND_BASE_URL}/chat/rooms/`,
  CHAT_ROOMS_CREATE:          `${BACKEND_BASE_URL}/chat/rooms/create/`,
  CHAT_MESSAGES:              `${BACKEND_BASE_URL}/chat/`,                                // append {id}/messages/ at call site
  CALLS_INITIATE:             `${BACKEND_BASE_URL}/calls/initiate/`,
  CALLS_ICE_SERVERS:          `${BACKEND_BASE_URL}/calls/`,                               // append {id}/ice-servers/ at call site

  // ── Courier documents ─────────────────────────────────────────────────────
  COURIER_DOCUMENTS:          `${BACKEND_BASE_URL}/user/courier/documents/`,
  COURIER_DOCUMENTS_UPLOAD:   `${BACKEND_BASE_URL}/user/courier/documents/upload/`,
} as const;
