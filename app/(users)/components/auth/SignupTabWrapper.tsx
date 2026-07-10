import { ReactNode } from "react";
import { setActiveSignupType, SignupType } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface SignupTabWrapperProps {
  children: ReactNode;
}

const SignupTabWrapper = ({ children }: SignupTabWrapperProps) => {
  const dispatch = useAppDispatch();
  const activeSignupType = useAppSelector(
    (state) => state.auth.activeSignupType,
  );

  const handleTabSwitch = (tabType: SignupType) => {
    dispatch(setActiveSignupType(tabType));
  };

  const isActiveTab = (tabType: SignupType) => activeSignupType === tabType;

  const getTabStyles = (tabType: SignupType) => {
    const baseStyles =
      "flex py-[0.3rem] md:py-2 px-[0.6rem] md:px-4 justify-center items-center cursor-pointer transition-all duration-200";
    const activeStyles = "border-b-2 border-b-[#FE581C]";

    return `${baseStyles} ${isActiveTab(tabType) ? activeStyles : ""}`;
  };

  const getTextStyles = (tabType: SignupType) => {
    const baseStyles =
      "unageo-regular font-medium text-[#A5A5A5] transition-all duration-200";
    const activeStyles =
      "text-[1.18rem] md:text-[1.5rem] leading-[1.4rem] md:leading-[2.5rem] text-[#FE581C]";
    const inactiveStyles =
      "text-[0.8rem] md:text-[1.2rem] leading-[1.2rem] md:leading-[2rem]";

    return `${baseStyles} ${isActiveTab(tabType) ? activeStyles : inactiveStyles}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-[0.3rem] md:gap-2 w-full">
        <div className="flex p-[0.3rem] md:p-2 justify-center items-center gap-[0.8rem] md:gap-6">
          {/* Delivery Tab */}
          <div
            onClick={() => handleTabSwitch("delivery")}
            className={getTabStyles("delivery")}
          >
            <h2 className={getTextStyles("delivery")}>Delivery</h2>
          </div>

          {/* Courier Tab */}
          <div
            onClick={() => handleTabSwitch("courier")}
            className={getTabStyles("courier")}
          >
            <h2 className={getTextStyles("courier")}>Courier</h2>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SignupTabWrapper;
