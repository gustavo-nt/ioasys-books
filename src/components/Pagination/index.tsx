import { Button } from "../Button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

import styles from "./styles.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePagination(page: number): void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  handlePagination,
}: PaginationProps) => {
  const handlePrevPage = () => {
    handlePagination(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePagination(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <p>
        Página <strong>{currentPage}</strong> de{" "}
        <strong>{Math.floor(totalPages)}</strong>
      </p>

      <Button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage - 1 === 0}
      >
        <MdOutlineChevronLeft />
      </Button>

      <Button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage + 1 > Math.floor(totalPages)}
      >
        <MdOutlineChevronRight />
      </Button>
    </div>
  );
};
