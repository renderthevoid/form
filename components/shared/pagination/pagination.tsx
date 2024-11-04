import React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages = [];

    if (totalPages > 1) {
      // Добавляем первую страницу
      pages.push(1);
    }

    if (currentPage > 3) {
      // Добавляем многоточие, если есть пропущенные страницы
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      // Добавляем многоточие, если есть пропущенные страницы
      pages.push("...");
    }

    if (totalPages > 1) {
      // Добавляем последнюю страницу
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9981 6.99405C14.5503 6.99296 14.9989 7.43978 15 7.99207C15.0011 8.54435 14.5543 8.99295 14.002 8.99405L13.9981 6.99405ZM0.294368 8.72832C-0.0969304 8.33857 -0.0981855 7.70541 0.291565 7.31411L6.6429 0.937551C7.03265 0.546253 7.66581 0.544998 8.05711 0.934747C8.44841 1.3245 8.44966 1.95766 8.05991 2.34896L2.41428 8.01701L8.08234 13.6626C8.47364 14.0524 8.47489 14.6856 8.08514 15.0769C7.69539 15.4682 7.06223 15.4694 6.67093 15.0797L0.294368 8.72832ZM14.002 8.99405L1.00205 9.01982L0.998089 7.01982L13.9981 6.99405L14.002 8.99405Z"
            fill="#121212"
          />
        </svg>
      </button>

      <div className={styles.pages}>
        {getPages().map((page, index) => (
          <button
            key={index}
            className={`${styles.pageNumber} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => {
              if (typeof page === "number") {
                onPageChange(page);
              }
            }}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.arrow}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999878 9C0.447593 9 -0.00012207 8.55228 -0.00012207 8C-0.00012207 7.44772 0.447593 7 0.999878 7V9ZM14.707 7.29289C15.0975 7.68342 15.0975 8.31658 14.707 8.70711L8.34302 15.0711C7.9525 15.4616 7.31933 15.4616 6.92881 15.0711C6.53829 14.6805 6.53829 14.0474 6.92881 13.6569L12.5857 8L6.92881 2.34315C6.53829 1.95262 6.53829 1.31946 6.92881 0.928932C7.31933 0.538408 7.9525 0.538408 8.34302 0.928932L14.707 7.29289ZM0.999878 7H13.9999V9H0.999878V7Z"
            fill="#121212"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
