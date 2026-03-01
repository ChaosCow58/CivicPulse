import styles from './page.module.css';

import Map from '@/components/map/MapWrapper';
import CreateReportModal from '@/components/reports/CreateReportModal';
import { ModalProvider } from "@/components/reports/ModalContext";
import ReloadButton from '@/components/ui/ReloadButton';
import ProfileButton from '@/components/ui/ProfileButton';

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