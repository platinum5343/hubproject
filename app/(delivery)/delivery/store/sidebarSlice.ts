"use client";
import { createSlice } from "@reduxjs/toolkit";

interface MobileSidebarState {
  mobileSidebar: boolean;
  expanded: boolean
}

const initialState: MobileSidebarState = {
  mobileSidebar: false,
  expanded: false
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.mobileSidebar = true;
    },
    closeSidebar: (state) => {
      state.mobileSidebar = false;
    },
    toggleExpanded: (state) => {
      state.expanded = !state.expanded
    }
  },
});

export const { openSidebar, closeSidebar, toggleExpanded } = sidebarSlice.actions;
export default sidebarSlice.reducer;
