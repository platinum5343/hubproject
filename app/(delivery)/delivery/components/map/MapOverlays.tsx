import CourierDetails from "../tracking/CourierDetails";
import ActiveCouriers from "../tracking/ActiveCouriers";
import { useAppSelector } from "../../store/hooks";
import DeliveryMobileIcons from "./features/DeliveryMobileIcons";
import DeliveryDesktopIcons from "./features/DeliveryDesktopIcons";
import ActiveRidesUnavailable from "./features/desktop/ActiveRidesUnavailable";
import ReturnPackage from "./features/desktop/ReturnPackage";
import UnavailableRiders from "./features/desktop/UnavailableRiders";
import CashUnavailable from "./features/desktop/CashUnavailable";
import StartTracking from "./features/desktop/StartTracking";
import { AnimatePresence } from "framer-motion";
import RideComplete from "./features/desktop/RideComplete";

interface Props {
  isMobile: boolean;
  isDesktop: boolean;
}

export default function MapOverlays({ isMobile, isDesktop }: Props) {
  const {
    rideInProgress,
    activeCouriers,
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
      {/* Screen-specific UI */}
      {isMobile && <DeliveryMobileIcons />}
      {isDesktop && <DeliveryDesktopIcons />}
      {activeRidesUnavailable && <ActiveRidesUnavailable />}
      {returnPackage && <ReturnPackage />}
      {unavailableRiders && <UnavailableRiders />}
      {cashUnavailable && <CashUnavailable />}
      <AnimatePresence>{startTracking && <StartTracking />}</AnimatePresence>
      {rideComplete && <RideComplete />}


      {/* Screen-agnostic UI (ALWAYS allowed to render) */}
      {rideInProgress && <CourierDetails />}
      {activeCouriers && <ActiveCouriers />}
    </>
  );
}
