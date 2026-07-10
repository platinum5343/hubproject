import { ReactNode } from "react";
import Location from "../components/icons/multiple-delivery/Location";
import { IoIosAddCircle } from "react-icons/io";
import MapIcon from "../components/icons/multiple-delivery/MapIcon";
import DeliveryIcon from "../components/icons/multiple-delivery/DeliveryIcon";
import TrackRiderIcon from "../components/icons/multiple-delivery/TrackIcon";

export interface HowItWorksStep {
  id: number;
  icon: ReactNode;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 1,
    icon: <Location />,
    description:
      "Open the map and enter the first delivery details pickup address.",
  },
  {
    id: 2,
    icon: <IoIosAddCircle className="flex-shrink-0 mt-0.5" size={20} />,
    description:
      'Tap "Add Delivery Stops" to include extra drop-off locations. You can add up to 3 stops per rider (depending on the region).',
  },
  {
    id: 3,
    icon: <MapIcon />,
    description:
      "Once all destinations are added, Dispatch Hub automatically arranges the best delivery route for faster drop-offs.",
  },
  {
    id: 4,
    icon: <DeliveryIcon />,
    description:
      "Check your delivery summary for delivery time and cost. Then confirm and choose payment option to book your rider.",
  },
  {
    id: 5,
    icon: <TrackRiderIcon />,
    description:
      "Track your rider complete each delivery from your tracking map, with live status updates at every stop.",
  },
];
