import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "google";
type IconPosition = "left" | "right";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

const Button = ({
  variant = "primary",
  isLoading = false,
  children,
  fullWidth = false,
  className = "",
  disabled,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 unageo-regular font-medium cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "button py-3 px-8 rounded-[3.125rem] md:rounded-[2rem] text-[0.8rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem]",
    secondary:
      "py-3 px-8 rounded-[3.125rem] md:rounded-[2rem] border border-gray-300 text-[0.8rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem] hover:bg-gray-50",
    outline:
      "py-3 px-8 rounded-[3.125rem] md:rounded-[2rem] border border-[#EDEDED] text-[0.8rem] md:text-[1rem] leading-[1.125rem] md:leading-[1.5rem] hover:bg-gray-50",
    google:
      "py-3 md:py-4 px-[1.1rem] md:px-8 gap-[0.2rem] md:gap-2 rounded-[3.125rem] md:rounded-4xl border border-[#EDEDED] h-[3.25rem] hover:bg-gray-50",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const renderContent = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (!icon) {
      return <span>{children}</span>;
    }

    return (
      <>
        {iconPosition === "left" && (
          <span className="inline-flex items-center shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {iconPosition === "right" && (
          <span className="inline-flex items-center shrink-0">{icon}</span>
        )}
      </>
    );
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
