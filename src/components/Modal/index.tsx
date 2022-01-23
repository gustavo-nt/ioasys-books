import { useEffect, useState } from "react";
import ReactModal from "react-modal";

import { Button } from "../Button";
import { ItemDetail } from "../ItemDetail";
import { RiCloseFill } from "react-icons/ri";

import api from "../../services/api";
import styles from "./styles.module.scss";
import Image from "next/image";

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
  const [detailsBook, setDetailsBook] = useState<BookProps>();

  useEffect(() => {
    async function getCurrentBook() {
      try {
        const response = await api.get(`/books/${idBook}`);
        setDetailsBook(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentBook();
  }, [idBook]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`${styles.container} react-modal-content`}
    >
      <Button type="button" hover={false} onClick={onRequestClose}>
        <RiCloseFill />
      </Button>

      <div className={styles.content}>
        <div className={styles.img}>
          <Image
            src="/images/default.png"
            layout="fixed"
            width={349}
            height={513}
            alt={detailsBook?.title}
          />
        </div>
        <div className={styles.details}>
          <h2>Change By Design Second line example teste</h2>
          <span>Tim Brown, Julie Zhuo, Fried Maximiilian</span>

          <div className={styles.info}>
            <h3>Informações</h3>
            <ItemDetail title="Páginas" label="304 páginas" />
            <ItemDetail title="Editora" label="Editora Loyola" />
            <ItemDetail title="Publicação" label="2020" />
            <ItemDetail title="Idioma" label="Inglês" />
            <ItemDetail title="Título Original" label="Change By Design" />
            <ItemDetail title="ISBN-10" label="0062856626" />
            <ItemDetail title="ISBN-13" label="978-0062856623" />
          </div>

          <div className={styles.summary}>
            <h3>Resenha da Editora</h3>
            <p>
              <q>
                Hazel foi diagnosticada com câncer aos treze anos e agora, aos
                dezesseis, sobrevive graças a uma droga revolucionária que detém
                a metástase em seus pulmões. Ela sabe que sua doença é terminal
                e passa os dias vendo tevê e lendo Uma aflição imperial, livro
                cujo autor deixou muitas perguntas sem resposta.
              </q>
            </p>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
