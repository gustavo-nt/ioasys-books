import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { Pagination } from "../../components/Pagination";

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

const Home: NextPage = () => {
  const router = useRouter();
  const { getRefreshToken, signOut } = useAuth();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState("");
  const [books, setBooks] = useState<Array<BookProps>>([]);

  useEffect(() => {
    async function selectBooks() {
      try {
        await getRefreshToken();

        const { data } = await api.get("/books", {
          params: {
            page,
            amount: 12,
          },
        });

        setIsLoading(false);
        setBooks(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        signOut();
        router.push("/");
      }
    }

    selectBooks();
  }, [page]);

  const handlePagination = (newPage: number) => {
    setIsLoading(true);
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const handleOpenModal = (id: string) => {
    setShowModal(true);
    setCurrentBook(id);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Head>
        <title>ioasys Books | Home</title>
        <meta name="description" content="Conheça nossas opções de livors" />
        <meta property="og:title" content="ioasys Books - Sua loja de livros" />
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <Header mode="dark" />

          {isLoading ? (
            <div className={styles.loading}>
              <Loading />
            </div>
          ) : (
            <div className={styles.cards}>
              {books.map((book) => (
                <Card
                  onClick={() => handleOpenModal(book.id)}
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </main>
      </div>

      <Modal
        idBook={currentBook}
        isOpen={showModal}
        onRequestClose={handleCloseModal}
      />
    </>
  );
};

export default Home;
