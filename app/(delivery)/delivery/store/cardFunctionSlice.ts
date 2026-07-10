"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface cardFunctionState {
  functions: boolean;
  edit: boolean;
}

const initialState: cardFunctionState = {
  functions: true,
  edit: false,
};

const cardFunctionSlice = createSlice({
  name: "cardFunction",
  initialState,
  reducers: {
    openEditFunction: (state) => {
      state.functions = false;
      state.edit = true;
    },
    openCardFunction: (state) => {
      state.functions = true;
      state.edit = false;
    },
  },
});

export const { openCardFunction, openEditFunction } = cardFunctionSlice.actions;
export default cardFunctionSlice.reducer;
