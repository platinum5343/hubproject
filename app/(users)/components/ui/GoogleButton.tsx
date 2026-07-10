import Image from "next/image";
import React from "react";

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const GoogleButton = ({
  text = "Signup with Google",
  className = "",
  ...props
}: GoogleButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-full py-2 md:py-3 px-[1.1rem] md:px-8 gap-[0.2rem] md:gap-2 rounded-[3.125rem] md:rounded-4xl border border-[#EDEDED] h-[3.25rem] cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
      {...props}
    >
      <Image
        src={"/google.svg"}
        alt="google"
        width={24}
        height={24}
        className="h-6 w-6 object-cover"
      />
      <h3 className="unageo-regular text-[0.875rem] md:text-[1rem] leading-[0.9rem] md:leading-[1.5rem]">
        {text}
      </h3>
    </button>
  );
};

export default GoogleButton;
