import Image from "next/image";
import React from "react";
import Socials from "./footer/Socials";
import FooterLinks from "./footer/FooterLinks";

const Footer = () => {
  return (
    <div className="flex items-center justify-center py-[1.7rem] md:py-[3rem] px-8 md:px-[5rem] bg-black">
      <div className="flex flex-col justify-center items-center gap-[1.25rem] lg:gap-[1.75rem] w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[0.75rem] w-full">
          <div className="flex items-center gap-[0.2rem]">
            <Image
              src="/logo1.png"
              alt="logo"
              className="w-[1.9rem] md:w-[2.5rem] h-auto"
              width={40}
              height={25}
            />
            <h2 className="unageo-regular text-[1rem] md:tet-[1.5rem] font-bold leading-[1.75rem] md:leading-[2rem] text-white">
              DISPATCH HUB
            </h2>
          </div>
          <Socials />
        </div>
        <div className="w-full h-[0.125rem] bg-white"></div>
        <div className="flex flex-col md:flex-row justify-between gap-[0.625rem] items-start md:items-center w-full">
          <h3 className="md:max-w-[23.6rem] unageo-regular text-[0.875rem] md:text-[1.125rem] font-medium leading-[1.25rem] md:leading-[1.75rem] text-white">
            Hours: Monday to Friday, 8:00 AM - 6:00 PM; Saturday, 9:00 AM - 4:00
            PM
          </h3>
          <div className="flex flex-col md:px-4 items-start gap-1">
            <FooterLinks />
            <div className="flex items-center gap-2">
              <Image src={'/copyright.png'} width={18} height={18} className="w-[0.8rem] md:w-[1.125rem] h-[0.8rem] md:h-[1.125rem]" alt="copyright"/>
              <h3 className="text-[0.875rem] md:text-[1.125rem] font-medium unageo-regular leading-[1.25rem] md:leading-[1.75rem] text-white">
                2024 Dispatch Hub
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;