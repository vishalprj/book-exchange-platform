"use client";
import Card from "@/app/components/card";
import Modal from "@/app/components/model";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useForm } from "react-hook-form";
import {
  useAddBook,
  useDeleteBook,
  useGetBook,
  useUpdateBook,
} from "@/app/store/queries";
import toast from "react-hot-toast";

const HomePage = () => {
  const { register, handleSubmit, reset } = useForm();
  const userId = localStorage.getItem("userId");
  const { data } = useGetBook(userId);
  const { mutate: addBook } = useAddBook();
  const { mutate: updateBook } = useUpdateBook();
  const { mutate: deleteBook } = useDeleteBook();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const [genreFilter, setGenreFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("");

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreFilter(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorFilter(e.target.value);
  };

  const filteredBooks = (data || []).filter((book) => {
    const genreMatch =
      genreFilter === "all" ||
      book.genre.toLowerCase() === genreFilter.toLowerCase();
    const authorMatch = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    return genreMatch && authorMatch;
  });

  const openAddBookModal = () => {
    setSelectedBook(null);
    setModalType("add");
    setIsModalOpen(true);
    reset();
  };
  const openEditBookModal = (book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteBookModal = (book) => {
    setSelectedBook(book);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const onSubmit = async (formData) => {
    if (modalType === "add") {
      addBook(
        { ...formData, userId },
        {
          onSuccess: () => {
            reset();
          },
          onError: () => {
            reset();
          },
        }
      );
    } else if (modalType === "edit" && selectedBook) {
      updateBook({ ...formData, id: selectedBook.id });
    } else if (modalType === "delete" && selectedBook) {
      deleteBook({ id: selectedBook.id });
    }
    closeModal();
  };

  useEffect(() => {
    if (modalType === "edit" && selectedBook) {
      reset({
        title: selectedBook.title,
        author: selectedBook.author,
        genre: selectedBook.genre,
        image: selectedBook.image,
      });
    }
  }, [selectedBook, modalType, reset]);
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-8">
        <h1 className="text-4xl mb-8">My Books</h1>
        <div className="mb-4 flex flex-col sm:flex-row items-center">
          <div className="mb-2 sm:mb-0 sm:mr-4 flex items-center">
            <label className="mr-2 text-lg">Genre:</label>
            <select
              className="p-2 bg-gray-800 text-white rounded-lg border border-gray-700"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              <option value="all">All</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science">Science</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>

          <div className="flex items-center sm:ml-4">
            <label className="mr-2 text-lg">Author:</label>
            <input
              className="p-2 bg-gray-800 text-white rounded-lg border border-gray-700"
              type="text"
              placeholder="Author Name"
              value={authorFilter}
              onChange={handleAuthorChange}
            />
          </div>

          <button
            onClick={openAddBookModal}
            className="btn ml-0 sm:ml-4 mt-4 sm:mt-0 bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Add New Book
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredBooks?.map((book) => (
            <Card
              key={book.id}
              book={book}
              isEdit={true}
              onEdit={() => openEditBookModal(book)}
              onDelete={() => openDeleteBookModal(book)}
            />
          ))}
        </div>
      </main>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal}>
          {modalType === "add" && (
            <div>
              <h2 className="text-2xl mb-4">Add New Book</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title")}
                    placeholder="Title"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    {...register("author")}
                    placeholder="Author"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="genre">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    {...register("genre")}
                    placeholder="Genre"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="image">
                    Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    {...register("image")}
                    placeholder="Image Url"
                    className={styles.formInput}
                    required
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Add Book
                </button>
              </form>
            </div>
          )}
          {modalType === "edit" && selectedBook && (
            <div>
              <h2 className="text-2xl mb-4">Edit Book</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title")}
                    placeholder="Title"
                    className={styles.formInput}
                    defaultValue={selectedBook?.title}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    {...register("author")}
                    placeholder="Author"
                    className={styles.formInput}
                    defaultValue={selectedBook?.author}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="genre">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    {...register("genre")}
                    placeholder="Genre"
                    className={styles.formInput}
                    defaultValue={selectedBook?.genre}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles?.formLabel} htmlFor="image">
                    Image Url
                  </label>
                  <input
                    type="text"
                    id="image"
                    {...register("image")}
                    placeholder="Image Url"
                    className={styles.formInput}
                    defaultValue={selectedBook.image}
                    required
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Edit Book
                </button>
              </form>
            </div>
          )}
          {modalType === "delete" && selectedBook && (
            <div>
              <h1 className="text-xl mb-4">
                Are you sure you want to delete this book?
              </h1>
              <button onClick={onSubmit} className="btn">
                Confirm
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
