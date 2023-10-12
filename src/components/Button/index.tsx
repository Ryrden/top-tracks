import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, type, onClick, className, variant }: ButtonProps) {
    const btnDefault = "rounded-lg p-4 shadow-md text-lg font-normal"
    const btnTransition = "transition duration-180 ease-linear"
    const btnVariant = {
        "primary": "bg-green-600 text-white hover:bg-green-700",
        "secondary": "bg-white border-2 border-green text-black hover:bg-green-600 hover:text-white"
    }
    return <button type={type} className={`${className} ${btnDefault} ${btnTransition} ${btnVariant[variant]}`} onClick={onClick}>{children}</button>;
}
