"use client";
import { createSlice } from "@reduxjs/toolkit";

interface FaqState {
  dispatchHub: boolean;
  deliveryOrder: boolean;
  itemsType: boolean;
  deliveryTime: boolean;
  dispatchHubCourier: boolean;
}

const initialState: FaqState = {
  dispatchHub: false,
  deliveryOrder: false,
  itemsType: false,
  deliveryTime: false,
  dispatchHubCourier: false,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    toggleDispatchHub: (state) => {
      state.dispatchHub = !state.dispatchHub;
      state.deliveryOrder = false;
      state.itemsType = false;
      state.deliveryTime = false;
      state.dispatchHubCourier = false;
    },
    toggleDeliveryOrder: (state) => {
      state.dispatchHub = false;
      state.deliveryOrder = !state.deliveryOrder;
      state.itemsType = false;
      state.deliveryTime = false;
      state.dispatchHubCourier = false;
    },
    toggleItemsType: (state) => {
      state.dispatchHub = false;
      state.deliveryOrder = false;
      state.itemsType = !state.itemsType;
      state.deliveryTime = false;
      state.dispatchHubCourier = false;
    },
    toggleDeliveryTime: (state) => {
      state.dispatchHub = false;
      state.deliveryOrder = false;
      state.itemsType = false;
      state.deliveryTime = !state.deliveryTime;
      state.dispatchHubCourier = false;
    },
    toggleDispatchHubCourier: (state) => {
      state.dispatchHub = false;
      state.deliveryOrder = false;
      state.itemsType = false;
      state.deliveryTime = false;
      state.dispatchHubCourier = !state.dispatchHubCourier;
    },
  },
});

export const {
  toggleDispatchHub,
  toggleDeliveryOrder,
  toggleItemsType,
  toggleDeliveryTime,
  toggleDispatchHubCourier,
} = faqSlice.actions;
export default faqSlice.reducer;
