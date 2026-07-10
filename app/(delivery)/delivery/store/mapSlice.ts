"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeliveryStop {
  id: string;
  location: string;
}

export interface PackageDetails {
  stopId: string;
  description: string;
  numberOfPackages: string;
  receiverName: string;
  receiverPhone: string;
  preferredVehicle: "bike" | "car" | null;
}

export interface mapStatus {
  findCourier: boolean;
  currentStep: number;
  currentLocation: string | null;
  deliveryLocation: string | null;
  additionalStops: DeliveryStop[]; // Dynamic array for additional stops
  deliveryType: "send" | "receive" | null; // Track if it is send or receive
  packageDetails: PackageDetails[];
  currentPackageFormIndex: number;
  paymentMethod: "cash" | "transfer" | "wallet" | null;
  currentPaymentScreen: number;
  showCardOverlay: boolean;
  paymentVerified: boolean;
  isLoadingPayment: boolean;
  multipleDeliveryInfo: boolean;
  trackingMessage: boolean;
}

const initialState: mapStatus = {
  findCourier: false,
  currentStep: 1,
  currentLocation: null,
  deliveryLocation: null,
  additionalStops: [],
  deliveryType: null,
  packageDetails: [],
  currentPackageFormIndex: 0,
  paymentMethod: null,
  currentPaymentScreen: 1,
  showCardOverlay: false,
  paymentVerified: false,
  isLoadingPayment: false,
  multipleDeliveryInfo: false,
  trackingMessage: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    startJobCreation: (state) => {
      state.findCourier = true;
      state.currentStep = 1;
    },

    closeJobCreation: () => {
      return initialState;
    },

    // Update location data
    setLocationData: (
      state,
      action: PayloadAction<{
        currentLocation: string;
        deliveryLocation: string;
      }>
    ) => {
      state.currentLocation = action.payload.currentLocation;
      state.deliveryLocation = action.payload.deliveryLocation;
    },

    // Add a new delivery stop
    addDeliveryStop: (state) => {
      if (state.additionalStops.length < 3) {
        state.additionalStops.push({
          id: `stop-${Date.now()}`,
          location: "",
        });
      }
    },

    // Update a specific delivery stop
    updateDeliveryStop: (
      state,
      action: PayloadAction<{ id: string; location: string }>
    ) => {
      const stop = state.additionalStops.find(
        (s) => s.id === action.payload.id
      );
      if (stop) {
        stop.location = action.payload.location;
      }
    },

    // Remove a delivery stop
    removeDeliveryStop: (state, action: PayloadAction<string>) => {
      state.additionalStops = state.additionalStops.filter(
        (stop) => stop.id !== action.payload
      );
    },

    // Set delivery type (send or receive)
    setDeliveryType: (state, action: PayloadAction<"send" | "receive">) => {
      state.deliveryType = action.payload;
    },

    // Save package details for a specific stop
    savePackageDetails: (state, action: PayloadAction<PackageDetails>) => {
      const existingIndex = state.packageDetails.findIndex(
        (pd) => pd.stopId === action.payload.stopId
      );

      if (existingIndex !== -1) {
        state.packageDetails[existingIndex] = action.payload;
      } else {
        state.packageDetails.push(action.payload);
      }
    },

    // Navigate to next package form
    nextPackageForm: (state) => {
      state.currentPackageFormIndex += 1;
    },

    // Navigate to previous package form
    prevPackageForm: (state) => {
      if (state.currentPackageFormIndex > 0) {
        state.currentPackageFormIndex -= 1;
      }
    },

    //Set specific package form index
    setPackageFormIndex: (state, action: PayloadAction<number>) => {
      state.currentPackageFormIndex = action.payload;
    },

    // Payment method actions
    setPaymentMethod: (
      state,
      action: PayloadAction<"cash" | "transfer" | "wallet">
    ) => {
      state.paymentMethod = action.payload;
    },

    nextPaymentScreen: (state) => {
      state.currentPaymentScreen += 1;
    },

    prevPaymentScreen: (state) => {
      if (state.currentPaymentScreen > 1) {
        state.currentPaymentScreen -= 1;
      }
    },

    resetPaymentScreens: (state) => {
      state.currentPaymentScreen = 1;
      state.paymentMethod = null;
    },

    //Navigate to next step
    nextStep: (state) => {
      state.currentStep += 1;
      state.currentPackageFormIndex = 0;
    },

    // Navigate to previous step
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    // Go to specific step
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Reset form
    resetJobCreation: (state) => {
      return initialState;
    },

    //View card overlay
    openCardOverlay: (state) => {
      state.showCardOverlay = true;
    },

    // Close card overlay
    closeCardOverlay: (state) => {
      state.showCardOverlay = false;
    },

    setPaymentVerified: (state, action: PayloadAction<boolean>) => {
      state.paymentVerified = action.payload;
    },
    setLoadingPayment: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPayment = action.payload;
    },
    setMultipleDeliveryInfo: (state, action: PayloadAction<boolean>) => {
      state.multipleDeliveryInfo = action.payload;
    },
    setTrackingMessage: (state, action: PayloadAction<boolean>) => {
      state.trackingMessage = action.payload;
    },
  },
});

export const {
  startJobCreation,
  closeJobCreation,
  setLocationData,
  addDeliveryStop,
  updateDeliveryStop,
  removeDeliveryStop,
  setDeliveryType,
  savePackageDetails,
  nextPackageForm,
  prevPackageForm,
  setPackageFormIndex,
  setPaymentMethod,
  nextPaymentScreen,
  prevPaymentScreen,
  resetPaymentScreens,
  nextStep,
  prevStep,
  goToStep,
  resetJobCreation,
  openCardOverlay,
  closeCardOverlay,
  setPaymentVerified,
  setLoadingPayment,
  setMultipleDeliveryInfo,
  setTrackingMessage,
} = mapSlice.actions;
export default mapSlice.reducer;
