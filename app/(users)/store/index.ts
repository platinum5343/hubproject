"use client";
"use client";
import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./mobileSidebarSlice";
import logisticsReducer from "./logisticSlice";
import faqReducer from "./faqSlice";
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    mobileSidebar: mobileSidebarReducer,
    logistics: logisticsReducer,
    faq: faqReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;