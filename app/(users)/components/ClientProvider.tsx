"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import Sidebar from "./Sidebar";
import AuthModal from "./AuthModal";

// NOTE: Navbar and Footer are rendered by layout.tsx (Server Component).
// Do NOT add them here — that caused the double footer/navbar bug.
export default function ClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div>
        <Sidebar />
        {children}
        <AuthModal />
      </div>
    </Provider>
  );
}