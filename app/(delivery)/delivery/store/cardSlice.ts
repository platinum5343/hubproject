"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardColors {
  [key: number]: string;
}

interface CardState {
  activeCardIndex: number;
  totalCards: number;         // driven by backend — starts at 0
  cardColors: CardColors;
  removeModalOpen: boolean;   // confirmation modal for card removal
}

const initialState: CardState = {
  activeCardIndex: 0,
  totalCards: 0,              // 0 = empty state until backend provides real cards
  cardColors: {},
  removeModalOpen: false,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<number>) => {
      if (action.payload < state.totalCards) {
        state.activeCardIndex = action.payload;
      }
    },
    setCardColor: (
      state,
      action: PayloadAction<{ cardIndex: number; color: string }>
    ) => {
      state.cardColors[action.payload.cardIndex] = action.payload.color;
    },
    setTotalCards: (state, action: PayloadAction<number>) => {
      state.totalCards = action.payload;
      if (state.activeCardIndex >= action.payload) {
        state.activeCardIndex = 0;
      }
    },
    // Called when backend confirms a card was removed
    removeActiveCard: (state) => {
      if (state.totalCards > 0) {
        // Remove color entry for the removed card
        const newColors: CardColors = {};
        let newIndex = 0;
        Object.entries(state.cardColors).forEach(([key, val]) => {
          const k = parseInt(key);
          if (k !== state.activeCardIndex) {
            newColors[newIndex++] = val;
          }
        });
        state.cardColors = newColors;
        state.totalCards -= 1;
        state.activeCardIndex = 0;
      }
      state.removeModalOpen = false;
    },
    openRemoveModal: (state) => {
      state.removeModalOpen = true;
    },
    closeRemoveModal: (state) => {
      state.removeModalOpen = false;
    },
  },
});

export const {
  setActiveCard,
  setCardColor,
  setTotalCards,
  removeActiveCard,
  openRemoveModal,
  closeRemoveModal,
} = cardSlice.actions;

export default cardSlice.reducer;