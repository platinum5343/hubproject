"use client";

import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import {
  clearMessages,
  logout,
  setError,
  setLoading,
  setSuccess,
} from "@/app/(users)/store/authSlice";
import { logoutUser } from "@/app/(users)/lib/authService";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearMessages());

      const refresh =
        localStorage.getItem("dispatch_hub_refresh") ||
        sessionStorage.getItem("dispatch_hub_refresh") ||
        "";
      const access =
        localStorage.getItem("dispatch_hub_token") ||
        sessionStorage.getItem("dispatch_hub_token") ||
        "";

      if (refresh && access) {
        const { ok, data } = await logoutUser(refresh, access);
        if (!ok) {
          dispatch(setError(typeof data?.detail === "string" ? data.detail : "Logout failed"));
          // still clear client state
        } else {
          dispatch(setSuccess("Logged out"));
        }
      }

      dispatch(logout());
    } catch (e) {
      dispatch(setError(e instanceof Error ? e.message : "Logout failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isAuthenticated) return null;

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="unageo-regular text-[#FE581C] cursor-pointer hover:underline"
    >
      Logout
    </button>
  );
}

