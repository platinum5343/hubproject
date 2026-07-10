"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { openSidebar } from "../store/mobileSidebarSlice";
import { openModal } from "../store/authSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Normalise: strip any trailing slash so comparisons always work,
  // regardless of whether trailingSlash is on or off in next.config.
  const path = pathname.replace(/\/$/, "") || "/";

  const handleOpenSidebar = () => dispatch(openSidebar());
  const handleSignIn = () => dispatch(openModal("signin"));
  const handleSignup = () => dispatch(openModal("signup"));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reusable nav link style — active = orange border pill, inactive = plain black
  const navLinkClass = (href: string) => {
    const isActive = href === "/" ? path === "/" : path.startsWith(href);
    return `flex py-2 px-4 items-center justify-center transition-colors duration-200 ${
      isActive
        ? "border border-[#FE581C] text-[#FE581C] rounded-[1.5rem]"
        : "text-black hover:text-[#FE581C]"
    }`;
  };

  return (
    <div
      className={`flex lg:px-20 px-[1.7rem] py-[0.8rem] lg:py-5 gap-[0.625rem] fixed z-50 transition-all duration-300 ease-in-out nav ${
        isScrolled
          ? "top-10 lg:top-6 left-4 right-4 w-auto bg-[#FBFBFB]/10 rounded-[2rem] lg:left-6 lg:right-6 lg:mx-6"
          : "top-10 lg:top-0 lg:bg-[#FFF] bg-[#FDFDFD] rounded-[2rem] lg:rounded-[0rem] left-4 right-4 lg:left-0 lg:right-0"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo — always navigates to home */}
        <Link href="/" className="flex items-center gap-[0.35rem] hover:opacity-80 transition-opacity">
          <Image
            src="/logo.svg"
            width={49}
            height={30}
            alt="logo"
            className="w-[2rem] md:w-[3rem] h-[1rem] md:h-[2rem]"
          />
          <h1 className="unageo text-[1.2rem] lg:text-[1.7rem] font-bold leading-[1.9rem] lg:leading-[2.8rem]">
            Dispatch Hub
          </h1>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex p-2 items-center gap-6">
          <Link href="/" className={navLinkClass("/")}>
            <h2 className="unaego text-[1.125rem] font-medium leading-[1.75rem]">
              Home
            </h2>
          </Link>
          <Link href="/map" className={navLinkClass("/map")}>
            <h2 className="unaego text-[1.125rem] font-medium leading-[1.75rem]">
              Map
            </h2>
          </Link>
          <Link href="/blog" className={navLinkClass("/blog")}>
            <h2 className="unaego text-[1.125rem] font-medium leading-[1.75rem]">
              Blog
            </h2>
          </Link>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex p-1 items-center gap-6">
          <button
            onClick={handleSignup}
            className="flex py-[0.96rem] px-[2.3rem] justify-center items-center rounded-[1.9rem] bg-[#FE581C] unageo-regular text-[0.9rem] leading-[1.43rem] text-white hover:bg-[#f54708] active:bg-[#db450f] transition-all duration-500 ease-in-out cursor-pointer"
          >
            Signup
          </button>
          <button
            onClick={handleSignIn}
            className="flex py-[0.96rem] px-[2.3rem] justify-center items-center rounded-[1.9rem] border border-black unageo-regular text-[0.9rem] leading-[1.43rem] text-[#FE581C] cursor-pointer hover:border-[#FE581C] transition-colors duration-200"
          >
            Login
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="block lg:hidden" onClick={handleOpenSidebar}>
          <Image
            src="/menu.svg"
            alt="menu"
            className="w-[1.25rem] h-[1.5rem]"
            width={20}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;