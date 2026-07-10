import ArrowRight from "../../icons/payment-method/ArrowRight";

interface PaymentOptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentOptionButton = ({
  label,
  isSelected,
  onClick,
}: PaymentOptionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-[1.25rem] px-[0.625rem] flex items-center rounded-[1rem] text-[1rem] leading-[1.2rem] transition-all duration-300 justify-between cursor-pointer ${
        isSelected
          ? " border-2 border-[#FE581C]"
          : "bg-[#F8F8F8] text-[#616161] border-2 border-transparent"
      }`}
    >
      {label}
      {isSelected && <ArrowRight />}
    </button>
  );
};

export default PaymentOptionButton;
