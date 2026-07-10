"use client";
// store/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BookingStep = "calendar" | "month" | "time";

interface BookingState {
  step: BookingStep;
  selectedYear: number | null;
  selectedMonth: number | null;
  selectedDate: number | null;
  selectedTime: string | null;
  selectedPeriod: "AM" | "PM" | null;
}

const initialState: BookingState = {
  step: "calendar",
  selectedYear: null,
  selectedMonth: null,
  selectedDate: null,
  selectedTime: null,
  selectedPeriod: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<BookingStep>) => {
      state.step = action.payload;
    },
    setMonth: (
      state,
      action: PayloadAction<{ month: number; year: number }>
    ) => {
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
    setDate: (
      state,
      action: PayloadAction<{ date: number; month: number; year: number }>
    ) => {
      state.selectedDate = action.payload.date;
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
    setTime: (
      state,
      action: PayloadAction<{ time: string; period: "AM" | "PM" }>
    ) => {
      state.selectedTime = action.payload.time;
      state.selectedPeriod = action.payload.period;
    },
    resetBooking: (state) => {
      return initialState;
    },
  },
});

export const { setStep, setMonth, setDate, setTime, resetBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
