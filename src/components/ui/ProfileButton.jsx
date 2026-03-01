"use client";

import { useState } from "react";
import LoginButton from "@/components/auth/LogoutButton";

export default function ProfileButton({ onLogout }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute bottom-8 right-6 z-700">
            {/* Main circular button */}
            <button
                onClick={() => setOpen(!open)}
                title="Profile Options"
                className="w-12 h-12 bg-white text-black rounded-full hover:bg-gray-200 flex items-center justify-center shadow-lg transition"
            >
                <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
                    <svg className="absolute w-12 h-12 text-body-subtle -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
            </button>

            {/* Popup menu above the button, shifted slightly left */}
            {open && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-[75%] w-32 bg-white shadow-lg rounded-lg py-2 flex flex-col items-center">
                    <button
                        onClick={onLogout}
                        className="w-full text-center px-4 py-2 hover:bg-gray-100 rounded"
                    >
                        <LoginButton />
                    </button>
                </div>
            )}
        </div>
    );
}