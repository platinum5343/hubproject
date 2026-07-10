import Image from "next/image";

interface VehicleSelectorProps {
  selectedVehicle: "bike" | "car" | null;
  onSelect: (vehicle: "bike" | "car") => void;
}

const VehicleSelector = ({
  selectedVehicle,
  onSelect,
}: VehicleSelectorProps) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <h3 className="text-[1rem] leading-[1.25rem] text-[#616161]">
        Preferred Vehicle
      </h3>
      <div className="flex p-[0.625rem] justify-between items-center w-full">
        {/* Bike option */}
        <div
          onClick={() => onSelect("bike")}
          className={`flex items-center justify-center py-[0.7rem] px-[2.2rem] rounded-[0.9rem] cursor-pointer transition-colors ${
            selectedVehicle === "bike"
              ? "border-2 border-[#FE581C]"
              : "bg-[#F8F8F8]"
          }`}
        >
          <Image
            src="/delivery/bike.png"
            alt="bike"
            width={36}
            height={36}
            className="w-[2.2rem] h-[2.2rem]"
          />
        </div>

        {/* Car option */}
        <div
          onClick={() => onSelect("car")}
          className={`flex items-center justify-center py-[0.7rem] px-[2.2rem] rounded-[0.9rem] cursor-pointer transition-colors ${
            selectedVehicle === "car"
              ? "border-2 border-[#FE581C]"
              : "bg-[#F8F8F8]"
          }`}
        >
          <Image
            src="/delivery/cab.png"
            alt="car"
            width={36}
            height={36}
            className="w-[2.2rem] h-[2.2rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;
