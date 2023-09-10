"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  fullwidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullwidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-sm px-3 py-2 text-sm  font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outiline-offeset-2`,
        disabled && "opacity-50 cursor-default",
        fullwidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-[#2b192e] hover:bg-[#65272c] focus-visible:outiline-[#65272c]"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
