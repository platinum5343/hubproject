// components/PaymentForm/CardItem.tsx
interface CardItemProps {
  bankName: string;
  accountNumber: string;
  cardNumber: string;
  isSelected: boolean;
  onClick: () => void;
}

const CardItem = ({
  bankName,
  accountNumber,
  cardNumber,
  isSelected,
  onClick,
}: CardItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 rounded-[1rem] bg-[#fafafa] text-left cursor-pointer transition-all duration-500 ease-in-out ${
        isSelected ? "border-2 border-[#FE581C] " : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[0.875rem] font-medium text-[#616161]">
            {bankName} {accountNumber}
          </p>
          <p className="text-[0.875rem] text-[#616161]">{cardNumber}</p>
        </div>
      </div>
    </button>
  );
};

export default CardItem;
