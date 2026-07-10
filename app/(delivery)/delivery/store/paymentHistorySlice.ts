"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentHistoryType } from "../utils/payment-history";

export type PaymentDetailType = PaymentHistoryType | null

export interface PaymentHistoryState {
 selectedPayment: PaymentDetailType
}

const initialState: PaymentHistoryState = {
  selectedPayment: null
}

const paymentHistorySlice  = createSlice({
  name: "paymentHistory",
  initialState,
  reducers: {
    openPaymentDetail: (state, action: PayloadAction<PaymentHistoryType>) => {
      state.selectedPayment = action.payload
    },
    closePaymentDetail: (state) => {
      state.selectedPayment = null
    }
  }
})

export const {openPaymentDetail, closePaymentDetail} = paymentHistorySlice.actions
export default paymentHistorySlice.reducer