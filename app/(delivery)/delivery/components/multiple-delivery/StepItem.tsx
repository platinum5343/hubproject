// components/multiple-delivery/StepItem.tsx
import { ReactNode } from "react";

interface StepItemProps {
  icon: ReactNode;
  description: string;
}

const StepItem = ({ icon, description }: StepItemProps) => {
  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <h2 className="text-[#616161] text-[0.875rem] leading-[1.125rem] flex-1">
        {description}
      </h2>
    </div>
  );
};

export default StepItem;
