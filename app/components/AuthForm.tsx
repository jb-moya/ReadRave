"use client";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input/Input";

type authType = "LOGIN" | "SIGNUP";

const AuthForm = () => {
    const [authType, setAuthType] = useState<authType>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleAuthType = useCallback(() => {
        setAuthType(authType === "LOGIN" ? "SIGNUP" : "LOGIN");
    }, [authType]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (authType === "LOGIN") {
            // login logic
        } else if (authType === "SIGNUP") {
            // signup logic
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);
    };

    return (
        <div>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    id="username"
                    type="text"
                    label="Username"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />

                <Input
                    id="password"
                    type="password"
                    label="Password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
};

export default AuthForm;
