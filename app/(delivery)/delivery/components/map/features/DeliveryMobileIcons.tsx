import React from "react";
import DeliveryMenu from "../../icons/DeliveryMenu";
import TrackIcon from "../../icons/TrackIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openSidebar } from "../../../store/sidebarSlice";
import RideInProgress from "./mobile/RideInProgress";
import StartJobCreation from "./mobile/StartJobCreation";
import ActiveRidesUnavailable from "./mobile/ActiveRidesUnavailable";
import ReturnPackage from "./mobile/ReturnPackage";
import UnavailableRiders from "./mobile/UnavailableRiders";
import CashUnavailable from "./mobile/CashUnavailable";
import StartTracking from "./mobile/StartTracking";
import { setStartTracking } from "../../../store/trackingSlice";
import RideComplete from "./mobile/RideComplete";

const DeliveryMobileIcons = () => {
  const dispatch = useAppDispatch();
  const {
    rideInProgress,
    numberOfRides,
    returnPackage,
    unavailableRiders,
    cashUnavailable,
    startTracking,
    rideComplete
  } = useAppSelector((state) => state.tracking);
  const activeRidesUnavailable = numberOfRides >= 5;
  return (
    <>
      <div className=" absolute top-[1rem] left-[2rem] flex flex-col gap-4 z-[1]">
        {/* Menu Icon */}
        <button
          onClick={() => dispatch(openSidebar())}
          className="bg-white border-none rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Menu"
        >
          <DeliveryMenu />
        </button>

        {/* Tracking Icon */}
        <button
          onClick={() => dispatch(setStartTracking(true))}
          className="bg-white border-none rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Tracking"
        >
          <TrackIcon />
        </button>
      </div>
      <div className="flex flex-col items-center w-full absolute bottom-0 left-0 right-0 top-[29rem] bg-white z-5 rounded-t-[2.5rem] px-8 pt-[1.25rem] unageo-regular gap-[1.62rem]">
        <div className="w-8 h-[0.375em] rounded-[0.625rem] bg-[#D3D3D3]"></div>
        {rideInProgress ? (
          <RideInProgress />
        ) : activeRidesUnavailable ? (
          <ActiveRidesUnavailable />
        ) : returnPackage ? (
          <ReturnPackage />
        ) : unavailableRiders ? (
          <UnavailableRiders />
        ) : cashUnavailable ? (
          <CashUnavailable />
        ) : startTracking ? (
          <StartTracking />
        ) : rideComplete ? (
          <RideComplete />
        ) : (
          <StartJobCreation />
        )}
      </div>
    </>
  );
};

export default DeliveryMobileIcons;
