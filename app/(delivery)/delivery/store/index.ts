"use client";
"use client";
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import paymentHistoryReducer from "./paymentHistorySlice";
import scheduledDeliveryReducer from "./scheduledDeliverySlice";
import bookingReducer from "./bookingSlice";
import walletReducer from "./walletSlice";
import cardReducer from "./cardSlice";
import cardFunctionReducer from "./cardFunctionSlice";
import mapReducer from "./mapSlice";
import trackingReducer from "./trackingSlice";
import { loadPersistedMapState, persistMapMiddleware } from "./persistMiddleware";

// Rehydrate the map slice from sessionStorage so in-progress form data
// survives page reloads. Returns undefined on the server (no-op for SSR).
const persistedMap = loadPersistedMapState();

// The strict RTK generic constraints on preloadedState and the middleware tuple
// don't accept Partial<mapStatus> or a 2-element middleware tuple without casts.
// All runtime behaviour is correct; only type inference needs the escape hatch.
export const store = (configureStore as any)({
  reducer: {
    sidebar: sidebarReducer,
    paymentHistory: paymentHistoryReducer,
    scheduledDelivery: scheduledDeliveryReducer,
    booking: bookingReducer,
    wallet: walletReducer,
    card: cardReducer,
    cardFunction: cardFunctionReducer,
    map: mapReducer,
    tracking: trackingReducer,
  },
  ...(persistedMap ? { preloadedState: { map: persistedMap } } : {}),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(persistMapMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;