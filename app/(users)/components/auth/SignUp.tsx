import { useAppSelector } from "../../store/hooks";
import SignupTabWrapper from "./SignupTabWrapper";
import DeliverySignUp from "./signup/DeliverySignUp";
import CourierSignUp from "./signup/CourierSignUp";
import DeliverySignup2 from "./signup2/DeliverySignup2";
import CourierSignup2 from "./signup2/CourierSignup2";

const SignUp = () => {
  const { activeSignupType, deliverySignup, courierSignup } = useAppSelector(
    (state) => state.auth,
  );

  const renderSignUpContent = () => {
    if (activeSignupType === "delivery") {
      return deliverySignup.currentStep === 1 ? (
        <DeliverySignUp />
      ) : (
        <DeliverySignup2 />
      );
    } else {
      return courierSignup.currentStep === 1 ? (
        <CourierSignUp />
      ) : (
        <CourierSignup2 />
      );
    }
  };

  return <SignupTabWrapper>{renderSignUpContent()}</SignupTabWrapper>;
};

export default SignUp;
