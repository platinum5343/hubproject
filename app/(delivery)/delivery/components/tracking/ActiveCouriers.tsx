"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Image from "next/image";
import ExpandRidersView from "../icons/tracking/ExpandRidersView";
import AddRide from "../icons/tracking/AddRide";
import { startJobCreation } from "../../store/mapSlice";

const MAX_VISIBLE = 3;

const ActiveCouriers = () => {
  const dispatch = useAppDispatch();
  const { numberOfRides } = useAppSelector((state) => state.tracking);
  const [expanded, setExpanded] = useState(false);

  const rides = Array.from({ length: numberOfRides }, (_, index) => ({
    id: index,
    avatar:
      index === 0
        ? "/delivery/tracking/track1.png"
        : index === 1
        ? "/delivery/tracking/track2.png"
        : index === 2
        ? "/delivery/tracking/track3.png"
        : index === 3
        ? "/delivery/tracking/track4.png"
        : "/delivery/tracking/track5.png",
  }));

  const shouldShowExpand = numberOfRides > MAX_VISIBLE;

  const visibleRides = expanded ? rides : rides.slice(0, MAX_VISIBLE);

  return (
    <div className="absolute top-[8rem] md:top-[13rem] left-[15px] flex flex-col gap-6 z-[1]">
      <div className="flex p-2 items-center gap-[0.625rem] rounded-[2.1875rem] bg-white shadow-md">
        <div className="flex flex-col w-[3.152rem] items-center p-[0.3125rem] gap-1">
          {/* Avatars container */}
          <div
            className={`
              flex flex-col justify-center items-start gap-[-1rem]
              overflow-hidden transition-all duration-300 ease-in-out
            `}
            style={{
              maxHeight: expanded
                ? `${rides.length * 40}px`
                : `${MAX_VISIBLE * 40}px`,
            }}
          >
            {visibleRides.map((item) => (
              <Image
                key={item.id}
                alt="avatar"
                src={item.avatar}
                height={40}
                width={40}
              />
            ))}
          </div>

          {/* Expand icon (only if more than 3 rides) */}
          {shouldShowExpand ? (
            <div
              className="flex p-[0.3125rem] items-start rounded-[1.25rem] bg-[#FFCBB9] cursor-pointer transition-transform duration-300"
              onClick={() => setExpanded((prev) => !prev)}
            >
              <div
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                <ExpandRidersView />
              </div>
            </div>
          ) : (
            <div
              onClick={() => dispatch(startJobCreation())}
              className="flex p-[0.3125rem] items-start rounded-[1.25rem] bg-[#FFCBB9] cursor-pointer transition-transform duration-300"
            >
              <AddRide />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveCouriers;
