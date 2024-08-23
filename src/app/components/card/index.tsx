import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "../model/index";
import { useForm } from "react-hook-form";
import { useDeleteBook, useUpdateBook, listBook } from "@/app/store/queries";

const Card = ({ book, isEdit = false, isExchange = false }: any) => {
  const { register, handleSubmit } = useForm();
  const userId = localStorage.getItem("userId");
  const { mutate: updateData } = useUpdateBook();
  const { mutate: deleteBook } = useDeleteBook();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [bookList, setBookList] = useState([]);
  const handleEditClick = () => {
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const onSubmit = async (data: any) => {
    const editData = {
      ...data,
      id: book.id,
    };
    updateData(editData);
    handleCloseModal();
  };

  const handleRemoveClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    const id = {
      id: book.id,
    };
    deleteBook(id);
    handleCloseModal();
  };

  const handleExchangeClick = async () => {
    setIsExchangeModalOpen(true);
    const data = await listBook(userId);
    setBookList(data);
  };

  const handleCloseExchangeModal = () => {
    setIsExchangeModalOpen(false);
  };

  const handleProceedWithExchange = () => {
    if (selectedBookId) {
      console.log(`Proceeding with exchange: ${selectedBookId} for ${book.id}`);
      handleCloseExchangeModal();
    } else {
      alert("Please select a book to exchange.");
    }
  };

  const handleBookSelection = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.description}>{book.genre}</p>
      </div>
      {isEdit && (
        <div className={styles.actions}>
          <button onClick={handleEditClick} className={styles.iconButton}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={handleRemoveClick} className={styles.iconButton}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      )}
      {isExchange && (
        <button
          onClick={handleExchangeClick}
          className="p-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Exchange
        </button>
      )}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        {isEditing ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Edit Book</h2>
              <input
                type="text"
                {...register("title")}
                className={styles.input}
                defaultValue={book.title}
              />
              <input
                type="text"
                {...register("author")}
                className={styles.input}
                defaultValue={book.author}
              />
              <input
                type="text"
                className={styles.input}
                {...register("genre")}
                defaultValue={book.genre}
              />
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this book?</p>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Confirm
            </button>
          </div>
        )}
      </Modal>
      <Modal show={isExchangeModalOpen} onClose={handleCloseExchangeModal}>
        <div>
          <h2>Select a Book to Exchange</h2>
          <ul className={styles.bookList}>
            {bookList?.map((userBook: any) => (
              <li
                key={userBook.id}
                className={`${styles.bookItem} ${
                  selectedBookId === userBook.id ? styles.selected : ""
                }`}
                onClick={() => handleBookSelection(userBook.id)}
              >
                <h4>{userBook.title}</h4>
                <p>{userBook.author}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleProceedWithExchange}
            className={styles.proceedButton}
          >
            Proceed
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
