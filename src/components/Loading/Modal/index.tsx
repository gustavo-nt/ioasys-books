import styles from './styles.module.scss';

export const LoadingModal = () => {
  return (
    <div
      className={`${styles.container} 'spin'`}
      aria-label="Processando..."
    ></div>
  );
};
