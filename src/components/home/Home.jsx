import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home-intro']}>
        <div className={styles['home-logo']}>SHOPI</div>
        <div className={styles['home-content']}>Curated essentials for the modern lifestyle.</div>
        <button className={styles['home-button']}>Start Shopping</button>
      </div>
    </div>
  );
}
