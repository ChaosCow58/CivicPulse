'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { ssr: false });

export default function MapWrapper() {
    const [data, setData] = useState([]);

    const getReportsData = async () => {
        try {
            const response = await fetch("/api/reports");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error loading map data:", error);
        }
    };

    useEffect(() => {
        getReportsData();

        const interval = setInterval(() => {
            console.log("Auto refreshing map...");
            getReportsData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return <Map data={data} />;
}