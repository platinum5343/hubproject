# Auth views implementation checklist

## Step 1: SignIn (done/started)
- [x] Inspect proxy route `app/api/auth/login/route.ts`
- [x] Inspect UI `app/(users)/components/auth/SignIn.tsx`
- [x] Inspect service helpers in `app/(users)/lib/authService.ts`
- [x] Produce SignIn documentation (payload + behavior)


## Step 2: token_refresh
- [ ] Locate refresh usage in frontend (where refresh token is called)
- [ ] Write detailed doc for expected request/response

## Step 3: logout
- [ ] Locate logout UI/action handler
- [ ] Write detailed doc for required headers/body

## Step 4: email_verification
- [ ] Locate email verification UI + OTP purpose
- [ ] Write detailed doc

## Step 5: password_reset
- [ ] Confirm forgot/reset UI wiring to endpoints
- [ ] Write detailed doc

## Step 6: phone_otp
- [ ] Locate phone OTP UI
- [ ] Write detailed doc

## Step 7: change_password
- [ ] Locate change password UI/action handler
- [ ] Write detailed doc

## Step 8: customerSignUp / courierSignUp
- [ ] Locate signup UIs and backend payload mapping
- [ ] Write detailed doc

## Step 9: admin_users
- [ ] Locate admin auth flow
- [ ] Write detailed doc

## Step 10: courier_documents
- [ ] Locate courier documents upload flow
- [ ] Write detailed doc

## Step 11: profile_picture
- [ ] Locate profile picture upload/update flow
- [ ] Write detailed doc

