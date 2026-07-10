import React from "react";
import ForCustomers from "../components/terms-and-condition/ForCustomers";
import ForRiders from "../components/terms-and-condition/ForRiders";

const TermsAndConditions = () => {
  return (
    <>
      <div className="flex py-3 md:py-4 px-6 md:px-8 flex-col items-center justify-center mt-[6rem]">
        <div className="flex flex-col w-full items-center gap-2 md:gap-4 my-[3rem] md:my-[4rem]">
          <h1 className="text-center unageo text-[2rem] md:text-[3.75rem] font-bold leading-[2.5rem] md:leading-[4.25rem]">
            Terms and Conditions
          </h1>
          <h3 className="unageo-regular text-[1.2rem] md:text-[2.5rem] font-medium md:font-semibold leading-[2rem] md:leading-[3rem]">
            For Customers & Riders
          </h3>
          <h5 className="unageo-regular text-[1rem] md:text-[1.5rem] leading-[1.5rem] md:leading-[2rem]">
            Last Update: 13th July 2025
          </h5>
        </div>
      </div>
      <ForCustomers />
      <ForRiders />
    </>
  );
};

export default TermsAndConditions;
