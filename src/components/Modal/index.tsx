import { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";

import { Button } from "../Button";
import { ItemDetail } from "../ItemDetail";
import { RiCloseFill } from "react-icons/ri";

import api from "../../services/api";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Loading } from "../Loading";

interface ModalProps {
  idBook: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

interface BookProps {
  title: string;
  id: string;
  imageUrl: string;
  publisher: string;
  published: number;
  pageCount: number;
  authors: Array<string>;
  category: string;
  description: string;
  language: string;
  isbn10: string;
  isbn13: string;
}

export const Modal = ({ idBook, isOpen, onRequestClose }: ModalProps) => {
  const [detailsBook, setDetailsBook] = useState<BookProps>({} as BookProps);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function getCurrentBook() {
      try {
        const response = await api.get(`/books/${idBook}`);
        setDetailsBook(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentBook();
  }, [idBook]);

  const handleCloseModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className={`${styles.container} ${styles.overflow} react-modal-content`}
    >
      <Button type="button" hover={false} onClick={onRequestClose}>
        <RiCloseFill />
      </Button>

      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.img}>
            {detailsBook.imageUrl ? (
              <Image
                src={detailsBook.imageUrl}
                layout="fixed"
                width={349}
                height={513}
                alt={detailsBook?.title}
              />
            ) : (
              <Image
                src="/images/default.png"
                layout="fixed"
                width={349}
                height={513}
                alt={detailsBook?.title}
              />
            )}
          </div>
          <div className={`${styles.details} ${styles.overflow}`}>
            <h2>{detailsBook.title}</h2>

            <span>
              {detailsBook.authors ? (
                <span>{detailsBook.authors.join(", ")}</span>
              ) : (
                <span>Autor(es) desconhecido(s)</span>
              )}
            </span>

            <div className={styles.info}>
              <h3>Informações</h3>

              <ItemDetail title="Páginas" label={detailsBook.pageCount} />
              <ItemDetail title="Editora" label={detailsBook.publisher} />
              <ItemDetail title="Publicação" label={detailsBook.published} />
              <ItemDetail title="Idioma" label={detailsBook.language} />
              <ItemDetail title="Título Original" label={detailsBook.title} />
              <ItemDetail title="ISBN-10" label={detailsBook.isbn10} />
              <ItemDetail title="ISBN-13" label={detailsBook.isbn13} />
            </div>

            <div className={styles.summary}>
              <h3>Resenha da Editora</h3>

              <p>
                <q>{detailsBook.description}</q>
              </p>
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
};
