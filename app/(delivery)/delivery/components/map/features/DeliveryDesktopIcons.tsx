import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import TrackIcon from "../../icons/TrackIcon";
import {
  closeJobCreation,
  resetJobCreation,
  startJobCreation,
} from "../../../store/mapSlice";
import SearchIcon from "../../icons/SearchIcon";
import PrimaryButton from "../../shared/PrimaryButton";
import { setStartTracking } from "../../../store/trackingSlice";

const DeliveryDesktopIcons = () => {
  const dispatch = useAppDispatch();
  const { findCourier } = useAppSelector((state) => state.map);
  const { numberOfRides, startTracking } = useAppSelector(
    (state) => state.tracking
  );
  const { trackingMessage } = useAppSelector((state) => state.map);

  const maximumRides = numberOfRides >= 5;

  const endTracking = () => {
    dispatch(closeJobCreation());
    dispatch(setStartTracking(false))
  };

  const handleButtonClick = () => {
    // if (startTracking) return endTracking();
    if ((findCourier && trackingMessage) || startTracking) {
      return endTracking();
    }
    if (findCourier || maximumRides) return dispatch(closeJobCreation());
    dispatch(startJobCreation());
  };

  const buttonLabel = (() => {
    if (findCourier && trackingMessage) return "End Tracking";
    if (startTracking) return "End Tracking";
    if (findCourier || maximumRides) return "Cancel";
    return "Find Courier";
  })();

  const variant = (() => {
    if (findCourier && trackingMessage) return "primary";
    if (findCourier || maximumRides) return "tertiary";
    return "primary";
  })();
  return (
    <>
      <div className="absolute top-[2rem] left-[15px] flex flex-col gap-6 z-[1]">
        {/* Menu Icon */}
        <button
          onClick={() => dispatch(setStartTracking(true))}
          className="bg-white border-none rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Menu"
        >
          <TrackIcon />
        </button>

        {/* Tracking Icon */}
        <button
          onClick={() => dispatch(startJobCreation())}
          className="bg-white border-none rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Tracking"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="absolute bottom-10 right-0 left-0 flex items-center justify-center unageo-regular">
        <div className="w-[14rem]">
          <PrimaryButton
            label={buttonLabel}
            variant={variant}
            onClick={handleButtonClick}
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryDesktopIcons;
