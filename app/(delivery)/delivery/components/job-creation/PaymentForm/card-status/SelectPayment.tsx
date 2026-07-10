import { motion } from "framer-motion";
import CardItem from "../CardItem";
import { useAppSelector } from "@/app/(delivery)/delivery/store/hooks";
import PrimaryButton from "../../../shared/PrimaryButton";

interface SelectPaymentProps {
  simulateSuccess: boolean;
   setSimulateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCardId: number | null;
  handleCardSelect: (cardId: number) => void;
  handleContinue: () => void
}

const SelectPayment = ({ simulateSuccess, setSimulateSuccess, selectedCardId, handleCardSelect, handleContinue }: SelectPaymentProps) => {
  const cardNumber = useAppSelector((state) => state.wallet.cardNumber);

  const cards = Array.from({ length: cardNumber }, (_, index) => ({
    id: index,
    bankName:
      index === 0 ? "Kuda Bank" : index === 1 ? "First Bank" : "Access Bank",
    accountNumber:
      index === 0 ? "2013453923" : index === 1 ? "3013453923" : "1413453923",
    cardNumber:
      index === 0
        ? "5678 XXXX XXXX 8562"
        : index === 1
        ? "9878 XXXX XXXX 7642"
        : "4558 XXXX XXXX 4858",
  }));
  return (
    <motion.div
      key="selecting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
          Linked Cards
        </h3>
        <p className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
          Please pick a funded account to continue transaction.
        </p>
      </div>

      {/* Test Toggle (Remove in production) */}
      <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
        <input
          type="checkbox"
          id="simulate-success"
          checked={simulateSuccess}
          onChange={(e) => setSimulateSuccess(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="simulate-success" className="text-xs text-gray-700">
          Simulate Success (uncheck for failure test)
        </label>
      </div>

      {/* Card list */}
      <div className="flex flex-col gap-3 mb-6">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            bankName={card.bankName}
            accountNumber={card.accountNumber}
            cardNumber={card.cardNumber}
            isSelected={selectedCardId === card.id}
            onClick={() => handleCardSelect(card.id)}
          />
        ))}
      </div>

      {/* Continue button */}
      <PrimaryButton
        label="Continue"
        onClick={handleContinue}
        disabled={selectedCardId === null}
        fullWidth
      />
    </motion.div>
  );
};

export default SelectPayment;
