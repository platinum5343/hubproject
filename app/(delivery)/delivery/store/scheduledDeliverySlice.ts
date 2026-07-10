"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduledDeliveryType } from "../utils/scheduled-delivery";

export type ScheduledDetailType = ScheduledDeliveryType | null;

export interface ScheduledDeliveryState {
  calenderState: boolean;
  selectedSchedule: ScheduledDetailType;
}

const initialState: ScheduledDeliveryState = {
  calenderState: false,
  selectedSchedule: null,
};

const scheduledDeliverySlice = createSlice({
  name: "scheduledDelivery",
  initialState,
  reducers: {
    openCalender: (state) => {
      state.calenderState = true;
    },
    closeCalendar: (state) => {
      state.calenderState = false;
    },
    openEditSchedule: (state, action: PayloadAction<ScheduledDeliveryType>) => {
      state.selectedSchedule = action.payload;
      state.calenderState = false;
    },
    closeEditSchedule: (state) => {
      state.selectedSchedule = null;
      state.calenderState = true;
    },
  },
});

export const { openCalender, closeCalendar, openEditSchedule, closeEditSchedule } =
  scheduledDeliverySlice.actions;
export default scheduledDeliverySlice.reducer;
