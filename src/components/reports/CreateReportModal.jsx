"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/reports/Modal";
import { useModal } from "@/components/reports/ModalContext";
import { getLatLng } from "@/lib/map";

export default function CreateReportModal() {
    const { isOpen, setIsOpen } = useModal();

    if (!isOpen) return null;

    return <CreateReportContent isOpen={isOpen} setIsOpen={setIsOpen} />;
}

function CreateReportContent({ isOpen, setIsOpen }) {
    const { lat, lng } = getLatLng();

    const [form, setForm] = useState({
        type: "ROAD_ISSUE",
        severity: 1,
        latitude: lat,
        longitude: lng,
        issueDescription: "",
        isResolved: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (response.ok) window.location.reload();
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen absolute z-1000">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Create a Report</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Type */}
                    <label> Report Type:
                        <select name="type" value={form.type} onChange={handleChange} className="border p-1 w-full" required >
                            <option value="ROAD_ISSUE">Road Issue</option> <option value="PUBLIC_SAFETY">Public Safety</option>
                            <option value="SANITATION">Sanitation</option> <option value="WATER_ISSUE">Water Issue</option>
                            <option value="CRIME">Crime</option> <option value="OTHER">Other</option>
                        </select>
                    </label>
                    {/* Severity */}
                    <label> Severity (1-5):
                        <input type="number" name="severity" min={1} max={5} value={form.severity} onChange={handleChange} className="border p-1 w-full" required />
                    </label>
                    {/* Latitude & Longitude */}
                    <label> Latitude:
                        <input type="number" name="latitude" value={form.latitude} onChange={handleChange} className="border p-1 w-full bg-gray-200 text-gray-500 cursor-not-allowed" readOnly required />
                    </label>
                    <label> Longitude:
                        <input type="number" name="longitude" value={form.longitude} onChange={handleChange} className="border p-1 w-full bg-gray-200 text-gray-500 cursor-not-allowed" readOnly required />
                    </label>
                    {/* Description */}
                    <label> Explain the issue:
                        <textarea name="issueDescription" value={form.issueDescription} onChange={handleChange} className="border p-1 w-full" required rows={3} />
                    </label>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded mt-2" >
                        Submit Report
                    </button>
                </form>
            </Modal>
        </div>
    );
}