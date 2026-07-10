"use client";
import { useState } from "react";
import MultipleStopIcon from "../../icons/delivery-summary/MultipleStopIcon";

interface ExpandableSectionProps {
  title: string;
  items: { value: string; stopIndex: number }[];
  hasMultipleStops: boolean;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  items,
  hasMultipleStops,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col py-1 px-[0.125rem] items-start border-b border-b-[#E8E8E8]">
        <h2 className="text-[1rem] font-medium leading-[1.25rem]">{title}</h2>
        <h3 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
          Not available
        </h3>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col py-1 px-[0.125rem] items-start border-b border-b-[#E8E8E8]">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[1rem] font-medium leading-[1.25rem]">{title}</h2>
        {hasMultipleStops && (
          <div className="flex items-center gap-1">
            <MultipleStopIcon />
            <span className="text-[#FE581C] text-[0.875rem] font-medium">
              {items.length}
            </span>
          </div>
        )}
      </div>

      <div className="w-full mt-1">
        <h3 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
          {items[expandedIndex]?.value || "Not available"}
        </h3>

        {hasMultipleStops && items.length > 1 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setExpandedIndex(index)}
                className={`px-3 py-1 rounded-md text-[0.75rem] font-medium transition-colors cursor-pointer ${
                  expandedIndex === index
                    ? "bg-[#FE581C] text-white"
                    : "bg-[#F5F5F5] text-[#616161] hover:bg-[#E8E8E8]"
                }`}
              >
                Stop {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableSection;
