import React, { useState } from "react";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "../model/index";
import { useForm } from "react-hook-form";
import { useDeleteBook, useUpdateBook } from "@/app/store/queries";

const BookCard = ({ book }: any) => {
  const { register, handleSubmit } = useForm();
  const { mutate: updateData } = useUpdateBook();
  const { mutate: deleteBook } = useDeleteBook();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.description}>{book.genre}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={handleEditClick} className={styles.iconButton}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={handleRemoveClick} className={styles.iconButton}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>

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
    </div>
  );
};

export default BookCard;
