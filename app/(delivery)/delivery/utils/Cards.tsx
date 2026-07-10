import { useAppSelector } from "../store/hooks";

export const Cards = () => {
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

  return <div>{/* use cards here */}</div>;
};
