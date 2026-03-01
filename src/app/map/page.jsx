import styles from '@/styles/page.module.css';

import Map from '@/components/map/MapWrapper';
import CreateReportModal from '@/components/reports/CreateReportModal';
import { ModalProvider } from "@/components/reports/ModalContext";
import ReloadButton from '@/components/ui/ReloadButton';
import ProfileButton from '@/components/ui/ProfileButton';
import cron from 'node-cron';

const getReportsData = async () => {
    try {
        const response = await fetch(process.env.APP_BASE_URL + "/api/reports/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error loading map data:", error);
        throw error;
    }
}

const autoRefreshMap = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('Auto-refreshing map data...');
        try {
            await renderMapData();
            console.log('Map data refreshed successfully.');
        } catch (error) {
            console.error('Error refreshing map data:', error);
            throw error;
        }
    });
}

const renderMapData = async () => {
    try {
        const data = await getReportsData();
    } catch (error) {
        console.error("Error rendering map data:", error);
        throw error;
    }
}

export default async function Home() {
    const data = await getReportsData();
    return (
        <main className={styles.main}>
            <ModalProvider>
                <ReloadButton />
                <ProfileButton />
                <Map data={data} />
                <CreateReportModal />
            </ModalProvider>
        </main>
    );
}