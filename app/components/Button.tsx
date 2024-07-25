"use client";
import clsx from "clsx";
import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    onClick,
    className,
    children,
    secondary = false,
    danger,
    disabled,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                `
				relative
				border-none

				before:absolute
				after:absolute

				before:top-0
				before:left-0
				after:top-0
				after:left-0

				before:w-full
				after:w-full
				before:h-full
				after:h-full

				cursor-pointer

				bg-none

				before:transition-transform
				before:duration-300
				before:ease-elegant
				
				after:transition-transform
				after:duration-300
				after:ease-elegant
				after:scale-90

				hover:before:scale-y-90
				hover:after:scale-y-110

				group

				flex
				justify-center
				px-6
				py-2
				font-semibold
				focus-visible:outline
				focus-visible:outline-2
				focus-visible:outline-offset-2
				
				after:border
				`,
                className,
                disabled && "opacity-50 pointer-events-none",
                danger &&
                    "bg-red-500 hover:bg-red-500 focus-visible:outline-red-500 text-white before:border-none after:border-none",
                !secondary &&
                    !danger &&
                    "after:border-custom-static-2 before:bg-custom-static-2 text-custom-static-1",
                secondary &&
                    "after:border-custom-color-3/50 before:border before:border-custom-color-2/50 text-custom-static-2"
            )}
        >
            <span className="flex items-center gap-1 transition-transform ease-elegant duration-150 relative group-hover:scale-110">
                {children}
            </span>
        </button>
    );
};

export default Button;
