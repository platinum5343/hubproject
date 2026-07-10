import { useAppSelector } from "../../../store/hooks";
import PaymentMethodSelection from "../PaymentForm/PaymentMethodSelection";
import CashPaymentScreen from "../PaymentForm/CashPaymentScreen";
import TransferPaymentScreen from "../PaymentForm/TransferPaymentScreen";

const PaymentMethod = () => {
  const { paymentMethod, currentPaymentScreen } =
    useAppSelector((state) => state.map);

  const renderPaymentScreen = () => {
    if (currentPaymentScreen === 1) {
      return <PaymentMethodSelection />;
    }

    // Screen 2+ - Show payment details based in selected method
    switch (paymentMethod) {
      case "cash":
        return <CashPaymentScreen />;
      case "transfer":
        return <TransferPaymentScreen />;
      default:
        return <PaymentMethodSelection />;
    }
  };


  return (
    <div className="w-full h-full flex flex-col gap-6 relative">
      <div className="flex flex-col w-full h-full items-start ">
        {renderPaymentScreen()}
      </div>
    </div>
  );
};

export default PaymentMethod;
