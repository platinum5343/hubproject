import React, { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import type { PackageDetails } from "../../../store/mapSlice";
import ExpandableSection from "./ExpandableSection";

const DeliverySummarySection = () => {
  const {
    currentLocation,
    deliveryLocation,
    packageDetails,
    additionalStops,
    deliveryType,
  } = useAppSelector((state) => state.map);

  // Determine if this is a send or receive delivery
  const isSendDelivery = deliveryType === "send";

  // Build delivery addresses array (main delivery + additional stops)
  const deliveryAddresses = [
    { value: deliveryLocation || "Not provided", stopIndex: 0 },
    ...additionalStops.map((stop: { id: string; location: string }, index: number) => ({
      value: stop.location || "Not provided",
      stopIndex: index + 1,
    })),
  ];

  // Build package details arrays
  const descriptions = packageDetails.map((pkg: PackageDetails, index: number) => ({
    value: pkg.description || "Not provided",
    stopIndex: index,
  }));

  const contactDetails = packageDetails.map((pkg: PackageDetails, index: number) => ({
    value: pkg.receiverPhone || "Not provided",
    stopIndex: index,
  }));

  const nameDetails = packageDetails.map((pkg: PackageDetails, index: number) => ({
    value: pkg.receiverName || "Not provided",
    stopIndex: index,
  }));

  const hasMultipleStops = deliveryAddresses.length > 1;

  // Labels based on delivery type
  const pickupLabel = isSendDelivery ? "Pickup Address" : "Delivery Address";
  const deliveryLabel = isSendDelivery ? "Delivery Address" : "Pickup Address";
  const contactLabel = isSendDelivery
    ? "Receiver's Contact"
    : "Sender's Contact";
  const nameLabel = isSendDelivery
    ? "Receiver's Full name"
    : "Sender's Full name";

  return (
    <div className="flex flex-col items-center gap-[0.4375rem] w-full">
      <div className="flex flex-col items-center justify-center gap-1">
        <h3 className="text-[#808080] text-center text-[0.75rem] font-medium leading-[1rem]">
          Estimated ride fee:
        </h3>
        <h2 className="text-[#FE581C] text-[0.875rem] font-medium leading-[1.125rem]">
          NGN{" "}
          <span className="text-[1.25rem] font-bold leading-[1.75rem]">
            4250
          </span>
        </h2>
      </div>

      <div className="flex flex-col items-start gap-[1.5rem] rounded-[0.625rem] border-t border-t-[#FE581C] w-full">
        {/* Pickup/Delivery Address - Non-expandable (depends on delivery type) */}
        <div className="flex w-full flex-col py-1 px-[0.125rem] items-start border-b border-b-[#E8E8E8]">
          <h2 className="text-[1rem] font-medium leading-[1.25rem]">
            {pickupLabel}
          </h2>
          <h3 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
            {currentLocation || "Not provided"}
          </h3>
        </div>

        {/* Delivery/Pickup Address - Expandable (depends on delivery type) */}
        <ExpandableSection
          title={deliveryLabel}
          items={deliveryAddresses}
          hasMultipleStops={hasMultipleStops}
        />

        {/* Package Description - Expandable */}
        <ExpandableSection
          title="Package Description"
          items={descriptions}
          hasMultipleStops={hasMultipleStops}
        />

        {/* Contact Details - Expandable (Receiver's or Sender's based on delivery type) */}
        <ExpandableSection
          title={contactLabel}
          items={contactDetails}
          hasMultipleStops={hasMultipleStops}
        />

        {/* Name Details - Expandable (Receiver's or Sender's based on delivery type) */}
        <ExpandableSection
          title={nameLabel}
          items={nameDetails}
          hasMultipleStops={hasMultipleStops}
        />
      </div>
    </div>
  );
};

export default DeliverySummarySection;