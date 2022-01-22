import styles from './styles.module.scss';

export const Loading = () => {
  return (
    <div className={styles.container}> 
      <span>Carregando...</span>
    </div>
  );
}