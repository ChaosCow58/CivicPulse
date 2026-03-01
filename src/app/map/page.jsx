import styles from './page.module.css';

import Map from '@/components/map/MapWrapper';
import CreateReportModal from '@/components/reports/CreateReportModal';
import { ModalProvider } from "@/components/reports/ModalContext";

export default async function Home() {  
  return (
    <main className={styles.main}>
      <ModalProvider>
        <Map />
        <CreateReportModal />
      </ModalProvider>
    </main>
  );
}