import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col items-start md:gap-1 gap-[0.1rem] w-full">
        {label && (
          <label className="unageo-regular text-[1rem] md:text-[1.18rem] md:leading-[2rem] leading-[1.5rem] text-[#616161]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 flex justify-between items-center rounded-[2rem] md:rounded-[2.75rem] border border-[#808080] w-full h-[3rem] md:h-[3rem] unageo-regular text-[0.9rem] lg:text-[1.2rem] leading-[1.2rem] lg:leading-[1.6rem] focus:outline-none focus:border-[#FE581C] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <h3 className="unageo-regular text-[0.7rem] md:text-[1rem] leading-[1.2rem] md:leading-[1.6rem] text-[#A5A5A5]">
            {helperText}
          </h3>
        )}
        {error && (
          <h3 className="unageo-regular text-[0.7rem] md:text-[1rem] leading-[1.2rem] md:leading-[1.6rem] text-red-500">
            {error}
          </h3>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
