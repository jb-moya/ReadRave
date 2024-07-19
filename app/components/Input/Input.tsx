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
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
}) => {
    return (
        <div>
            <label className="block text-sm leading-6 text-custom-color-5/75">
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`
                      form-input
                      py-0
                      border
                      text-custom-color-5
                      bg-transparent
                      border-custom-color-5/15
                      `)}
                />
            </div>
        </div>
    );
};

export default Input;
