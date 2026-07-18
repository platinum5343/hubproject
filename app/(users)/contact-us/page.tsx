import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dispatch Hub — send us a message or contact our support team.",
};

const ContactUsPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex py-3 md:py-4 px-6 md:px-8 flex-col items-center justify-center mt-[6rem]">
          <h1 className="text-center unageo text-[2rem] md:text-[3.75rem] font-bold leading-[2.5rem] md:leading-[4.25rem]">
            Contact Us
          </h1>
       
      </div>

      <div className="w-full px-6 md:px-20 mb-[4.5rem] md:mb-[12rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] items-start">
          {/* Contact form */}
          <div className="flex flex-col items-start gap-[1.5rem]">
            <div className="h-[0.125rem] w-full bg-[#E8E8E8]" />

            <form className="flex flex-col w-full gap-4">
              

              <label className="flex flex-col gap-2 w-full">
                <textarea
                  className="w-full min-h-[160px] rounded-[0.75rem] border border-[#E8E8E8] px-4 py-3 unageo-regular text-[1rem]"
                  placeholder="Message us?"
                  required
                  name="message"
                />
              </label>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                  <label className="flex flex-col gap-2 w-full">
                  <span className="unageo-regular text-[1rem] md:text-[1.25rem]">Email</span>
                  <input
                    className="w-full rounded-[0.75rem] border border-[#E8E8E8] px-4 py-3 unageo-regular text-[1rem]"
                    type="email"
                    placeholder="you@example.com"
                    required
                    name="email"
                  />
                </label>
                <label className="flex flex-col gap-2 w-full">
                  <span className="unageo-regular text-[1rem] md:text-[1.25rem]">Phone number</span>
                  <input
                    className="w-full rounded-[0.75rem] border border-[#E8E8E8] px-4 py-3 unageo-regular text-[1rem]"
                    placeholder="+234 123 456 789s"
                    required
                    name="phone"
                  />
                </label>

              
              </div>
              <button
                type="submit"
                className="py-[0.9rem] px-6 md:px-10 rounded-[2rem] unageo-regular text-[1rem] font-medium leading-[1.125rem] md:leading-[1.5rem] w-full md:w-auto button bg-[#FE581C] text-white"
              >
                Send Message
              </button>

             
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

