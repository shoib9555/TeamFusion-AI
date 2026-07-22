import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-2
        font-medium
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;