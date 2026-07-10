"use client";
export const dynamic = "force-dynamic";

import { useAppSelector } from "./store/hooks";
import DesktopHeader from "./components/map/DesktopHeader";
import MapBody from "./components/map/MapBody";
import AuthGuard from "./components/AuthGuard";

const DashboardPage = () => {
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);

  return (
    <AuthGuard>
      <div
        className={`md:bg-[#FAFAFA] md:pr-8 items-center w-full transition-all duration-500 ease-in-out h-full ${
          isExpanded ? "md:pl-[18rem]" : "md:pl-28"
        }`}
      >
        <div className="flex flex-col w-full h-screen relative">
          <DesktopHeader />
          <MapBody />
        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;