import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.homeIntro}>
        <h1 data-testid="logo" className={styles.homeLogo}>
          SHOPI
        </h1>
        <div className={styles.homeContent}>Curated essentials for the modern lifestyle.</div>
        <Link to="/shop">
          <button className={styles.homeButton}>Start Shopping</button>
        </Link>
      </div>
    </div>
  );
}
