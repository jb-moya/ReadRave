"use client";
import { Toaster, ToastBar } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";

const enterAnimation = `
    @keyframes custom-enter {
        from {
            opacity: 0;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const exitAnimation = `
    @keyframes custom-exit {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-50%);
        }
    }
`;

const toastStyles = {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    borderRadius: "0px",
    animation: "custom-enter 1s ease",
};

const exitStyles = {
    ...toastStyles,
    animation: "custom-exit 1s ease",
};

export const ToasterContext = () => {
    const { theme } = useSelector((state: RootState) => state.theme);

    return (
        <>
            <style>
                {`
                ${enterAnimation}
                ${exitAnimation}
                .custom-enter {
                    animation: custom-enter 1s cubic-bezier(1, 0, 0, 1);
                }
                .custom-exit {
                    animation: custom-exit 1s cubic-bezier(1, 0, 0, 1);
                }
            `}
            </style>

            <Toaster
                toastOptions={{
                    style: {
                        borderRadius: "0px",
                    },
                }}
            >
                {(t) => (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            animation: t.visible
                                ? "custom-enter 500ms cubic-bezier(1, 0, 0, 1)"
                                : "custom-exit 1300ms cubic-bezier(1, 0, 0, 1)",
                            backgroundColor:
                                theme === "light"
                                    ? "rgb(27, 27, 27)"
                                    : "rgb(230, 216, 189)",
                            color:
                                theme === "light"
                                    ? "rgb(230, 216, 189)"
                                    : "rgb(27, 27, 27)",
                        }}
                    />
                )}
            </Toaster>
        </>
    );
};
