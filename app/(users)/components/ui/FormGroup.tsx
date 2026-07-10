import React from "react";

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = ({ children, className = "" }: FormGroupProps) => {
  return (
    <div
      className={`flex flex-col items-start gap-[0.3rem] md:gap-2 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default FormGroup;
