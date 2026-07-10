import React from "react";

type AlertType = "error" | "success" | "info" | "warning";

interface AlertMessageProps {
  type?: AlertType;
  message: string;
  className?: string;
}

const AlertMessage = ({
  type = "info",
  message,
  className = "",
}: AlertMessageProps) => {
  const alertStyles = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div
      className={`w-full p-3 border rounded-lg text-sm ${alertStyles[type]} ${className}`}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
