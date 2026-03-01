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
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[1000] p-4">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Create a Report
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Type */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Report Type
                            </label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            >
                                <option value="ROAD_ISSUE">Road Issue</option>
                                <option value="PUBLIC_SAFETY">Public Safety</option>
                                <option value="SANITATION">Sanitation</option>
                                <option value="WATER_ISSUE">Water Issue</option>
                                <option value="CRIME">Crime</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        {/* Severity */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Severity (1-5)
                            </label>
                            <input
                                type="number"
                                name="severity"
                                min={1}
                                max={5}
                                value={form.severity}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Latitude & Longitude */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={form.latitude}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={form.longitude}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Explain the Issue
                            </label>
                            <textarea
                                name="issueDescription"
                                value={form.issueDescription}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        >
                            Submit Report
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}