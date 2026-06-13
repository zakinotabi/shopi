import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.homeIntro}>
        <div className={styles.homeLogo}>SHOPI</div>
        <div className={styles.homeContent}>Curated essentials for the modern lifestyle.</div>
        <button className={styles.homeButton}>Start Shopping</button>
      </div>
    </div>
  );
}
