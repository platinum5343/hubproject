"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackingInfo {
  rideInProgress: boolean;
  activeCouriers: boolean;
  numberOfRides: number;   // driven by backend — 0 until a ride is assigned
  returnPackage: boolean;
  unavailableRiders: boolean;
  cashUnavailable: boolean;
  startTracking: boolean;
  rideComplete: boolean;
  rating: boolean;
  // Courier data — set by backend when a ride is matched
  courierName: string;
  courierAvatar: string;
  status: string;
  fromAddress: string;
  toAddress: string;
}

const initialState: TrackingInfo = {
  rideInProgress: false,
  activeCouriers: false,
  numberOfRides: 0,        // 0 = no hardcoded rides
  returnPackage: false,
  unavailableRiders: false,
  cashUnavailable: false,
  startTracking: false,
  rideComplete: false,
  rating: false,
  courierName: "",
  courierAvatar: "",
  status: "Ride in progress...",
  fromAddress: "",
  toAddress: "",
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    rideStarted: (state, action: PayloadAction<boolean>) => {
      state.rideInProgress = action.payload;
    },
    setActiveCourier: (state, action: PayloadAction<boolean>) => {
      state.activeCouriers = action.payload;
    },
    setStartTracking: (state, action: PayloadAction<boolean>) => {
      state.startTracking = action.payload;
    },
    setViewRideComplete: (state, action: PayloadAction<boolean>) => {
      state.rideComplete = action.payload;
    },
    setViewRating: (state, action: PayloadAction<boolean>) => {
      state.rating = action.payload;
    },
    // Called when backend assigns a courier to the ride
    setCourierData: (
      state,
      action: PayloadAction<{
        name: string;
        avatar: string;
        status?: string;
        from: string;
        to: string;
        numberOfRides?: number;
      }>
    ) => {
      state.courierName = action.payload.name;
      state.courierAvatar = action.payload.avatar;
      state.status = action.payload.status ?? "Ride in progress...";
      state.fromAddress = action.payload.from;
      state.toAddress = action.payload.to;
      state.numberOfRides = action.payload.numberOfRides ?? 1;
      state.rideInProgress = true;
      state.activeCouriers = true;
    },
  },
});

export const {
  rideStarted,
  setActiveCourier,
  setStartTracking,
  setViewRating,
  setViewRideComplete,
  setCourierData,
} = trackingSlice.actions;

export default trackingSlice.reducer;