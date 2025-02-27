"use client";

import styles from "./FlowerLoader.module.css";

export default function FlowerLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.petals}>
        <div className={styles.center}></div>
        {[...Array(8)].map((_, i) => {
          const rotation = i * 45;
          return (
            <div
              key={i}
              className={styles.petal}
              style={
                {
                  animationDelay: `${i * 0.05}s`,
                  "--rotation": `${rotation}deg`,
                } as React.CSSProperties
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}
