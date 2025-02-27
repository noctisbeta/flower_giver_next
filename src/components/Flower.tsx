import styles from './Flower.module.css';

export default function Flower() {
  return (
    <div className={styles.flower}>
      <div className={styles.center}></div>
      <div className={styles.petals}>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
      </div>
    </div>
  );
}
