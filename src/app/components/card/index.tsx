import React from "react";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Book } from "@/app/types";

export type CardProps = {
  book: Book;
  isEdit?: boolean;
  isExchange?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onExchange?: () => void;
};

const Card = ({
  book,
  isEdit = false,
  isExchange,
  onEdit,
  onDelete,
  onExchange,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={book.image} alt={book.title} className={styles.bookImage} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.genre}>{book.genre}</p>
        {isExchange && (
          <button
            onClick={onExchange}
            className="p-2 bg-green-600 text-white rounded hover:bg-green-500 mt-5"
          >
            Exchange
          </button>
        )}
      </div>
      {isEdit && (
        <div className={styles.actions}>
          <button onClick={onEdit} className={styles.iconButton}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={onDelete} className={styles.iconButton}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
