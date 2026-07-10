"use client";
import { createSlice } from "@reduxjs/toolkit";

interface LogisticState {
  customers: boolean;
  dispatch: boolean;
  logistics: boolean;
}

const initialState: LogisticState = {
  customers: false,
  dispatch: false,
  logistics: false,
};

const logisticSlice = createSlice({
  name: "logistics",
  initialState,
  reducers: {
    toggleCustomers: (state) => {
      state.customers = !state.customers;
      state.dispatch = false;
      state.logistics = false;
    },
    toggleDispatch: (state) => {
      state.customers = false;
      state.dispatch = !state.dispatch;
      state.logistics = false;
    },
    toggleLogistics: (state) => {
      state.customers = false;
      state.dispatch = false;
      state.logistics = !state.logistics;
    },
  },
});

export const { toggleCustomers, toggleDispatch, toggleLogistics } =
  logisticSlice.actions;
export default logisticSlice.reducer;
