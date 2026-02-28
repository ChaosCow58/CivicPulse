import styles from './page.module.css';

import Map from '../../components/map/MapWrapper';

export default function Home() {
  return (
    <main className={styles.main}>
      <Map />
    </main>
  );
}