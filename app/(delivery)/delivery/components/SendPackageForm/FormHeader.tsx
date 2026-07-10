import LocationIcon from "../icons/LocationIcon"

interface FormHeaderProps {
  hasMultipleStops: boolean
  currentIndex: number
  totalStops: number
  currentLocation?: string 
}

const FormHeader = ({
  hasMultipleStops,
  currentIndex,
  totalStops,
  currentLocation,
}: FormHeaderProps) => {
  return (
    <div className="flex flex-col items-start gap-[1.25rem] w-full">
      {/* Title and subtitle */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
            {hasMultipleStops ? "Multiple Delivery" : "Send Package"}
          </h3>
          <h3 className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
            Complete this form before you continue.
          </h3>
        </div>

        {/* Stop counter - only for multiple stops */}
        {hasMultipleStops && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FE581C] text-white flex items-center justify-center text-xs">
              {currentIndex + 1}
            </div>
            <span className="text-sm text-gray-600">{totalStops}</span>
          </div>
        )}
      </div>

      {/* Location display - only for multiple stops */}
      {hasMultipleStops && currentLocation && (
        <div className="flex items-center gap-2 text-[#FE581C] py-1 px-2 rounded-[1.875rem] bg-[#F8F8F8] w-full">
          <LocationIcon />
          <span className="text-[0.75rem] leading-[1rem] text-ellipsis overflow-hidden whitespace-nowrap">
            {currentLocation}
          </span>
        </div>
      )}
    </div>
  );
};

export default FormHeader