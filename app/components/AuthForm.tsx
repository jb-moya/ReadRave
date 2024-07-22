"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input/Input";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type authType = "LOGIN" | "SIGNUP";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [authType, setAuthType] = useState<authType>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const toggleAuthType = useCallback(() => {
        setAuthType(authType === "LOGIN" ? "SIGNUP" : "LOGIN");
    }, [authType]);

    // useEffect(() => {
    //     if (session?.status === "authenticated") {
    //         router.push("/users");
    //     }
    // }, [session?.status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "asdf",
            email: "asdf@mail.com",
            password: "12345555555555555",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (authType === "LOGIN") {
            // login logic
            signIn("credentials", {
                ...data,
                redirect: false,
                callbackUrl: "/users",
            })
                .then((callback) => {
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in");
                    }
                    if (callback?.error) {
                        toast.error("Invalid credentials");
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (authType === "SIGNUP") {
            axios
                .post("/api/register", data)
                .then(() => {
                    signIn("credentials", {
                        ...data,
                        redirect: false,
                        callbackUrl: "/users",
                    });
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false, callbackUrl: "/users" })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials");
                } else if (callback?.ok && !callback?.error) {
                    toast.success("Logged in");
                    router.push("/users");
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="w-full">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                {authType === "SIGNUP" && (
                    <Input
                        id="name"
                        type="text"
                        label="name"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                )}

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
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    inputClassName="relative"
                    inputContainerClassName="relative"
                >
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-custom-color-5 cursor-pointer hover:text-custom-color-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <TbEye /> : <TbEyeClosed />}
                    </div>
                </Input>

                <div className="flex  gap-2">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
                    >
                        {authType === "LOGIN" ? "Login" : "Sign Up"}
                    </Button>
                </div>
            </form>

            <div className="divide-y border-custom-color-4">
                <div className="p-4">
                    <p className="text-center text-sm text-custom-color-5/75">
                        or continue with
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    disabled={isLoading}
                    onClick={() => socialAction("google")}
                    secondary
                    className="w-full"
                >
                    <FcGoogle />
                    Google
                </Button>

                <Button
                    disabled={isLoading}
                    onClick={() => socialAction("github")}
                    secondary
                    className="w-full"
                >
                    <BsGithub />
                    Github
                </Button>
            </div>

            <div className="divide-y border-custom-color-4">
                <div className="flex p-4 items-center justify-center">
                    <div className="text-center  text-sm text-custom-color-5/75">
                        {authType === "LOGIN"
                            ? "new to readrave?"
                            : "Already have an account?"}
                    </div>

                    <button
                        onClick={toggleAuthType}
                        className="ml-2 text-custom-static-2 underline cursor-pointer hover:scale-105"
                        disabled={isLoading}
                    >
                        {authType === "LOGIN" ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
