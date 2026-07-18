# TODO

## Courier auth OTP/email verification alignment
- [x] Documented/verified refresh token contract: API.TOKEN_REFRESH returns {access, refresh}
- [x] Fixed courier signup 400 validation by sending required phone_number in CourierSignup2.tsx
- [x] Ensured courier signup opens OTP flow and redirects after verification
- [ ] Align courier signup verification UX with backend behavior:
  - Backend email says "Verify Email Address" via link (confirm-email/<uidb64>/<token>/)
  - Frontend currently shows 4-digit OTP UI for purpose=EMAIL_VERIFICATION
  - Next: modify courier signup flow to show a "check your email" / link-based verification step instead of OTP entry, OR switch purpose to PHONE_VERIFICATION only if backend actually supports phone OTP here.

## Task progress
- Current: user reports email contains link-based verification while UI expects 4-digit OTP.

