"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    children?: React.ReactNode;
    inputClassName?: string;
    inputContainerClassName?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    children,
    inputClassName,
    inputContainerClassName,
}) => {
    return (
        <div>
            <label className="block text-sm text-custom-color-5/75">
                {label}
            </label>
            <div className={inputContainerClassName}>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(
                        `
                      w-full
                      form-input
                      py-0
                      border
                      text-custom-color-5
                      bg-transparent
                      border-custom-color-5/15
                      focus:outline-none
                      focus:ring-1
                      focus:ring-custom-color-3
                      focus:border-custom-color-3`,
                        inputClassName,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
                {children}
            </div>
        </div>
    );
};

export default Input;
