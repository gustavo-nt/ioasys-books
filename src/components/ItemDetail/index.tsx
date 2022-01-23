import styles from "./styles.module.scss";

interface ItemDetailPros {
  title: string;
  label: string | number;
}

export const ItemDetail = ({ title, label }: ItemDetailPros) => {
  return (
    <div className={styles.container}>
      <span>{title}</span>
      <span>{label}</span>
    </div>
  );
};
