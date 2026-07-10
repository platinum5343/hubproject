"use client";
// store/slices/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  id: number;
  bankName: string;
  accountNumber: string;
  cardNumber: string;
  balance?: number;
}

export interface WalletState {
  expenseState: boolean;
  cardNumber: number;
  numberOfPayments: number;
  cards: Card[]; // Store actual card data
  selectedCardId: number | null;
}

const initialState: WalletState = {
  expenseState: false,
  cardNumber: 1,
  numberOfPayments: 1,
  cards: [
    {
      id: 0,
      bankName: "Kuda Bank",
      accountNumber: "2013453923",
      cardNumber: "5678 XXXX XXXX 8562",
    },
    {
      id: 1,
      bankName: "First Bank",
      accountNumber: "3013453923",
      cardNumber: "9878 XXXX XXXX 7642",
    },
    {
      id: 2,
      bankName: "Access Bank",
      accountNumber: "1413453923",
      cardNumber: "4558 XXXX XXXX 4858",
    },
  ],
  selectedCardId: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    openExpenses: (state) => {
      state.expenseState = true;
    },
    closeExpenses: (state) => {
      state.expenseState = false;
    },
    selectCard: (state, action: PayloadAction<number>) => {
      state.selectedCardId = action.payload;
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
      state.cardNumber = state.cards.length;
    },
  },
});

export const { openExpenses, closeExpenses, selectCard, addCard } =
  walletSlice.actions;
export default walletSlice.reducer;
