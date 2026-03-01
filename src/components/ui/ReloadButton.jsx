"use client";

export default function ReloadButton() {
    return (
        <button onClick={() => window.location.reload()} 
            title="Reload Map"
            className="px-5 py-4 text-md bg-white font-extrabold text-black rounded-full hover:bg-gray-200 top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-700 absolute"
        >
            ⟳
        </button>
    );
}
