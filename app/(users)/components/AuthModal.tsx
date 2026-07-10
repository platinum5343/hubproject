import { motion, AnimatePresence } from "framer-motion";
import { closeModal } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useModalScroll } from "../hooks/useModalScroll";
import { useContentTransition } from "../hooks/useContentTransition";
import { ModalBackdrop } from "./modal/ModalBackdrop";
import { ModalCloseButton } from "./modal/ModalCloseButton";
import { ModalDecorative } from "./modal/ModalDecorative";
import { modalVariants, contentVariants } from "../animations/ModalAnimations";
import { MODAL_STYLES } from "../constants/modalStyles";
import ForgotPassword from "./auth/ForgotPassword";
import OtpVerification from "./auth/OtpVerification";
import ResetPassword from "./auth/ResetPassword";
import VehicleDetails from "./auth/VehicleDetails";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.auth);

  const { currentContent, isTransitioning, setCurrentContent } =
    useContentTransition(activeModal);

  useModalScroll(!!activeModal);

  const handleClose = () => {
    dispatch(closeModal());
    setCurrentContent(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const renderModalContent = () => {
    switch (currentContent) {
      case "signin":
        return <SignIn />;
      case "signup":
        return <SignUp />;
      case "forgot-password":
        return <ForgotPassword />;
      case "otp-verification":
        return <OtpVerification />;
      case "reset-password":
        return <ResetPassword />;
      case "vehicle-details":
        return <VehicleDetails />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {activeModal && (
        <>
          <ModalBackdrop onClick={handleBackdropClick} />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 md:py-6 md:px-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
          >
            <motion.div
              variants={modalVariants}
              className="relative flex flex-col w-[92%] md:w-[36rem] max-h-[90vh] border border-[#F8F8F8] rounded-[1rem] bg-[#FDFDFD] md:px-12 py-8 px-8 shadow-2xl unageo-regular overflow-y-auto overflow-x-hidden scrollbar-hide"
              style={MODAL_STYLES}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClose={handleClose} />

              {/* <div className="flex flex-col items-center gap-10 w-full h-full overflow-auto scrollbar-hide"> */}
              <div className="flex flex-col items-center gap-4 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentContent}
                    variants={contentVariants}
                    initial="hidden"
                    animate={isTransitioning ? "hidden" : "visible"}
                    exit="exit"
                    className="w-full"
                  >
                    {renderModalContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* </div> */}

              <ModalDecorative />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
