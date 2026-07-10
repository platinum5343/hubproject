import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  motion,
  AnimatePresence,
  easeIn,
  easeOut,
  backOut,
  spring,
} from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSidebar } from "../store/mobileSidebarSlice";
import { openModal } from "../store/authSlice";

const Sidebar = () => {
  const sidebar = useAppSelector((state) => state.mobileSidebar.mobileSidebar);
  const dispatch = useAppDispatch();

  // Close sidebar function
  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleSignIn = () => {
    dispatch(openModal("signin"));
  };

  const handleSignup = () => {
    dispatch(openModal("signup"));
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  };

  // Animation variants for the sidebar container
  const sidebarVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: spring,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Animation variants for header elements
  const headerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      x: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  // Animation variants for close button
  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: backOut,
      },
    },
  };

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.4,
        ease: easeOut,
      },
    }),
  };

  // Animation variants for auth buttons
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.7 + i * 0.1,
        duration: 0.4,
        type: spring,
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/map", label: "Map" },
    { href: "/blog", label: "Blog" },
  ];

  const authButtons = [
    { id: 0, label: "Signup", primary: true, action: handleSignup },
    { id: 1, label: "Login", primary: false, action: handleSignIn },
  ];

  return (
    <AnimatePresence mode="wait">
      {sidebar && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[59]"
            onClick={handleCloseSidebar}
          />

          {/* Sidebar Container */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-[60] top-0 w-full lg:hidden flex flex-col p-4 items-start gap-2 bg-white shadow-lg pb-[10rem]"
          >
            {/* Header */}
            <div className="flex p-4 items-center justify-between w-full">
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-[0.24rem]"
              >
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  className="w-[2.1rem] h-[1.3rem] object-cover"
                  width={33}
                  height={20}
                />
                <h1 className="unageo text-[1.2rem] font-bold leading-[1.9rem]">
                  Dispatch Hub
                </h1>
              </motion.div>

              <motion.div
                variants={closeButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.1 },
                }}
              >
                <Image
                  src={"/cancel.png"}
                  alt="cancel"
                  className="w-[1.5rem] h-[1.5rem] object-cover cursor-pointer"
                  width={24}
                  height={24}
                  onClick={handleCloseSidebar}
                />
              </motion.div>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex py-[0.9rem] px-4 flex-col items-start justify-center gap-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex p-4 items-center unageo text-[1.125rem] font-medium leading-[1.75rem] hover:text-[#FE581C] transition-colors duration-200"
                      onClick={handleCloseSidebar}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex p-[0.192rem] flex-col justify-center items-center gap-[1.15rem] w-full">
                {authButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    className="w-full"
                  >
                    <button
                      // href={button.href}
                      className={`w-full flex h-[3.25rem] px-[1.47rem] py-[0.73rem] justify-center items-center rounded-[3.125rem] unageo text-[1rem] font-medium leading-[1.1rem] transition-all duration-300 ${
                        button.primary
                          ? "bg-[#FE581C] text-white hover:bg-[#f54708] shadow-md hover:shadow-lg"
                          : "text-[#FE581C] border border-black hover:bg-[#FE581C] hover:text-white hover:border-[#FE581C]"
                      }`}
                      onClick={() => {
                        handleCloseSidebar();
                        button.action();
                      }}
                    >
                      {button.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
