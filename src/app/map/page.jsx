import styles from './page.module.css';

import Map from '@/components/map/MapWrapper';
import CreateReportModal from '@/components/reports/CreateReportModal';
import { ModalProvider } from "@/components/reports/ModalContext";
import ReloadButton from '@/components/ui/ReloadButton';
import ProfileButton from '@/components/ui/ProfileButton';

const loadMapData = async () => {
    try {
        const response = await fetch("/api/reports", {
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

export default async function Home() {  
  return (
    <main className={styles.main}>
      <ModalProvider>
        <ReloadButton />
        <ProfileButton />
        <Map />
        <CreateReportModal />
      </ModalProvider>
    </main>
  );
}