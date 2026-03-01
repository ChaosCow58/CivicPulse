"use client";

import { useState } from "react";
import Modal from "@/components/reports/Modal";
import { useModal } from "@/components/reports/ModalContext";

export default function CreateReportModal() {
    const { isOpen, setIsOpen } = useModal();

    const initialLat = 40.7128; // Default to NYC
    const initialLng = -74.006;

    // Form state
    const [form, setForm] = useState({
        type: "ROAD_ISSUE",
        severity: 1,
        latitude: initialLat,
        longitude: initialLng,
        description: "",
        isResolved: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Report submitted:", form);

        // TODO: call your API to save the report
        // fetch('/api/reports', { method: 'POST', body: JSON.stringify(form) })

        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen absolute z-1000">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Create a Report</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Type */}
                    <label>
                        Report Type:
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="border p-1 w-full"
                        >
                            <option value="ROAD_ISSUE">Road Issue</option>
                            <option value="PUBLIC_SAFETY">Public Safety</option>
                            <option value="SANITATION">Sanitation</option>
                            <option value="WATER_ISSUE">Water Issue</option>
                            <option value="CRIME">Crime</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </label>

                    {/* Severity */}
                    <label>
                        Severity (1-5):
                        <input
                            type="number"
                            name="severity"
                            min={1}
                            max={5}
                            value={form.severity}
                            onChange={handleChange}
                            className="border p-1 w-full"
                        />
                    </label>

                    {/* Latitude & Longitude */}
                    <label>
                        Latitude:
                        <input
                            type="number"
                            name="latitude"
                            value={form.latitude}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            step="0.000001"
                        />
                    </label>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            name="longitude"
                            value={form.longitude}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            step="0.000001"
                        />
                    </label>

                    {/* Description */}
                    <label>
                        Explain the issue:
                        <textarea
                            name="issueDescription"
                            value={form.issueDescription}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            rows={3}
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                    >
                        Submit Report
                    </button>
                </form>
            </Modal>
        </div>
    );
}
