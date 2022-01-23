import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface BookProps {
  title: string;
  id: string;
  imageUrl: string;
  publisher: string;
  published: string;
  pageCount: string;
  authors: Array<string>;
}

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  book: BookProps;
}

export const Card = ({ book, ...rest }: CardProps) => {
  const { authors, published, title, pageCount, imageUrl, publisher } = book;
  return (
    <button className={styles.container} {...rest}>
      <div className={styles.image}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            layout="fixed"
            width={82}
            height={122}
            alt={title}
          />
        ) : (
          <Image
            src="/images/default.png"
            layout="fixed"
            width={82}
            height={122}
            alt={title}
          />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title ?? "Livro desconhecido"}</h2>
        <div className={styles.authors}>
          {authors.length > 2 ? (
            <>
              <span>{authors[0]}</span>
              <span>e mais {authors.length - 1} autores</span>
            </>
          ) : authors.length >= 1 ? (
            <>
              {authors.map((author) => (
                <span key={author}>{author}</span>
              ))}
            </>
          ) : (
            <span>Autor desconhecido</span>
          )}
        </div>
        <div className={styles.description}>
          <span>{pageCount} páginas</span>
          <span>Editora {publisher}</span>
          <span>Publicado em {published}</span>
        </div>
      </div>
    </button>
  );
};
