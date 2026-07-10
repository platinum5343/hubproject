"use client";
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType =
  | "signin"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "otp-verification"
  | "vehicle-details"
  | "onboarding"
  | "profile-setup"
  | null;

export type SignupType = "delivery" | "courier";

export interface User {
  id: string;
  email: string;
  name: string;
  isVerified?: boolean;
  isCourier?: boolean;
  onboardingComplete?: boolean;
}

// Form data interfaces
export interface SignupStep1Data {
  fullName: string;        // display name
  firstName?: string;      // mapped to first_name in backend
  lastName?: string;       // mapped to last_name in backend
  email: string;
  phoneNumber: string;
}

export interface SignupStep2Data {
  password: string;
  confirmPassword: string;
}

// Separate state for each signup flow
interface SignupFlowState {
  currentStep: 1 | 2;
  step1Data: SignupStep1Data | null;
  step2Data: SignupStep2Data | null;
}

interface AuthState {
  // Modal state
  activeModal: ModalType;
  isLoading: boolean;

  // Active signup type (which tab is selected)
  activeSignupType: SignupType;

  // Separate signup flows for delivery and courier
  deliverySignup: SignupFlowState;
  courierSignup: SignupFlowState;

  // Auth state
  isAuthenticated: boolean;
  user: User | null;

  // UI state
  error: string | null;
  successMessage: string | null;
}

const initialSignupFlow: SignupFlowState = {
  currentStep: 1,
  step1Data: null,
  step2Data: null,
};

const initialState: AuthState = {
  activeModal: null,
  activeSignupType: "delivery",
  deliverySignup: { ...initialSignupFlow },
  courierSignup: { ...initialSignupFlow },
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.activeModal = action.payload;
      state.error = null;
      state.successMessage = null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.error = null;
      state.successMessage = null;
    },

    // Switch between delivery and courier tabs
    setActiveSignupType: (state, action: PayloadAction<SignupType>) => {
      state.activeSignupType = action.payload;
      state.error = null;
      state.successMessage = null;
    },

    // Set step 1 data for specific signup type
    setSignupStep1Data: (
      state,
      action: PayloadAction<{ type: SignupType; data: SignupStep1Data }>,
    ) => {
      const { type, data } = action.payload;
      if (type === "delivery") {
        state.deliverySignup.step1Data = data;
        state.deliverySignup.currentStep = 2;
      } else {
        state.courierSignup.step1Data = data;
        state.courierSignup.currentStep = 2;
      }
    },

    // Set step 2 data for specific signup type
    setSignupStep2Data: (
      state,
      action: PayloadAction<{ type: SignupType; data: SignupStep2Data }>,
    ) => {
      const { type, data } = action.payload;
      if (type === "delivery") {
        state.deliverySignup.step2Data = data;
      } else {
        state.courierSignup.step2Data = data;
      }
    },

    // Go back to step 1 for specific signup type
    goBackToStep1: (state, action: PayloadAction<SignupType>) => {
      const type = action.payload;
      if (type === "delivery") {
        state.deliverySignup.currentStep = 1;
      } else {
        state.courierSignup.currentStep = 1;
      }
    },

    // Clear all signup data
    clearAllSignupData: (state) => {
      state.deliverySignup = { ...initialSignupFlow };
      state.courierSignup = { ...initialSignupFlow };
    },

    // Clear signup data for specific type
    clearSignupData: (state, action: PayloadAction<SignupType>) => {
      const type = action.payload;
      if (type === "delivery") {
        state.deliverySignup = { ...initialSignupFlow };
      } else {
        state.courierSignup = { ...initialSignupFlow };
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.successMessage = null;
    },

    setSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.error = null;
      state.isLoading = false;
    },

    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    // Called after a successful login / registration.
    // Persists the user to localStorage so the delivery dashboard
    // (which runs in a separate Redux store) can read the name.
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.activeModal = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("dispatch_hub_token", action.payload.id);
        localStorage.setItem("dispatch_hub_user", JSON.stringify(action.payload));
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("dispatch_hub_token");
        localStorage.removeItem("dispatch_hub_user");
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  setLoading,
  setError,
  setSuccess,
  setSignupStep1Data,
  setSignupStep2Data,
  goBackToStep1,
  clearMessages,
  clearSignupData,
  clearAllSignupData,
  setActiveSignupType,
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;