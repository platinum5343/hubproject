import { motion } from "framer-motion";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "danger";
  icon?: React.ReactNode;
}

const PrimaryButton = ({
  label,
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  variant = "primary",
  className = "",
  icon,
}: PrimaryButtonProps) => {
  // Define color variants
  const getVariantClasses = () => {
    if (disabled) {
      return "bg-[#A5A5A5] cursor-not-allowed text-white";
    }

    switch (variant) {
      case "primary":
        return "bg-[#FE581C] hover:bg-[#f54708] text-white";
      case "secondary":
        return "bg-[#A5A5A5] text-white";
      case "tertiary":
        return "bg-white text-[#FE581C] hover:bg-[#FFCBB9]";
      case "outline":
        return "bg-transparent border border-black text-[#FE581C] hover:opacity-75";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-[#FE581C] hover:bg-[#f54708] text-white";
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
      className={`flex py-4 px-8 justify-center gap-2 items-center rounded-[2rem] text-[1rem] leading-6 transition-all duration-300 mb-4 cursor-pointer ${getVariantClasses()} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <span>{label}</span>
      {icon && <span className="flex items-center">{icon}</span>}
    </motion.button>
  );
};

export default PrimaryButton;
