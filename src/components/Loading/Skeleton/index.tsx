import styles from './styles.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.img} ${styles.skeletonBox}`}></div>

      <div className={styles.info}>
        <div className={`${styles.title} ${styles.skeletonBox}`}></div>

        <div className={`${styles.subtitle} ${styles.skeletonBox}`}></div>
        <div className={`${styles.subtitle} ${styles.skeletonBox}`}></div>

        <div className={styles.description}>
          <div className={styles.skeletonBox}></div>
          <div className={styles.skeletonBox}></div>
          <div className={styles.skeletonBox}></div>
        </div>
      </div>
    </div>
  );
};
