"use client";
import Card from "@/app/components/card";
import Modal from "@/app/components/model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddBook,
  useDeleteBook,
  useGetBook,
  useUpdateBook,
} from "@/app/store/queries";
import useGetUserId from "@/app/utils/useGetUserId";
import BookFilter from "@/app/components/filter";
import styles from "./home.module.css";
import { Book } from "@/app/types";

type FormData = {
  title: string;
  author: string;
  genre: string;
  image: string;
  status: string;
};

const HomePage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const userId = useGetUserId();
  const { data: books } = useGetBook(userId);
  const { mutate: addBook } = useAddBook();
  const { mutate: updateBook } = useUpdateBook();
  const { mutate: deleteBook } = useDeleteBook();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | "">(
    ""
  );
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [genreFilter, setGenreFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("");

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreFilter(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorFilter(e.target.value);
  };

  const filteredBooks = (books || []).filter((book) => {
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

  const openEditBookModal = (book: Book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteBookModal = (book: Book) => {
    setSelectedBook(book);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const onSubmit = async (formData: FormData) => {
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
      deleteBook(selectedBook.id);
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
        <h1 className="text-3xl mb-8">My Books</h1>
        <BookFilter
          genreFilter={genreFilter}
          authorFilter={authorFilter}
          onGenreChange={handleGenreChange}
          onAuthorChange={handleAuthorChange}
          openAddBookModal={openAddBookModal}
          isAddBook
        />

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
                    {...register("title", { required: true })}
                    placeholder="Title"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    {...register("author", { required: true })}
                    placeholder="Author"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="genre">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    {...register("genre", { required: true })}
                    placeholder="Genre"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="image">
                    Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    {...register("image", { required: true })}
                    placeholder="Image Url"
                    className={styles.formInput}
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
                    {...register("title", { required: true })}
                    placeholder="Title"
                    className={styles.formInput}
                    defaultValue={selectedBook?.title}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    {...register("author", { required: true })}
                    placeholder="Author"
                    className={styles.formInput}
                    defaultValue={selectedBook?.author}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="genre">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    {...register("genre", { required: true })}
                    placeholder="Genre"
                    className={styles.formInput}
                    defaultValue={selectedBook?.genre}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles?.formLabel} htmlFor="image">
                    Image Url
                  </label>
                  <input
                    type="text"
                    id="image"
                    {...register("image", { required: true })}
                    placeholder="Image Url"
                    className={styles.formInput}
                    defaultValue={selectedBook.image}
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
              <button onClick={handleSubmit(onSubmit)} className={styles.btn}>
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
