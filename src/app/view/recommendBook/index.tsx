"use client";
import { useState, useEffect } from "react";
import Card from "@/app/components/card";
import BookFilter from "@/app/components/filter";
import Modal from "@/app/components/model";
import {
  exchangeRequest,
  listBook,
  useFetchMatchBook,
} from "@/app/store/queries";
import { Book, State } from "@/app/types";
import styles from "../discovery/discovery.module.css";
import useGetUserId from "@/app/utils/useGetUserId";
import toast from "react-hot-toast";
import Spinner from "@/app/components/spinner";

const MatchPage = () => {
  const userId = useGetUserId();
  const { data, isLoading } = useFetchMatchBook(userId);
  const [state, setState] = useState<State>({
    genreFilter: "all",
    authorFilter: "",
    isModalOpen: false,
    selectedBook: null,
    selectedBookId: "",
    bookList: [],
  });

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, genreFilter: e.target.value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, authorFilter: e.target.value }));
  };

  const closeModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      selectedBook: null,
    }));
  };

  const handleExchangeClick = async (book: Book) => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      selectedBook: book,
    }));
    try {
      const listData = await listBook(userId);
      setState((prevState) => ({ ...prevState, bookList: listData }));
    } catch (error) {
      toast.error("Failed to fetch your books for exchange.");
    }
  };

  const handleBookSelection = (bookId: string) => {
    setState((prevState) => ({ ...prevState, selectedBookId: bookId }));
  };

  const handleProceedWithExchange = async () => {
    const { selectedBook, selectedBookId } = state;
    if (selectedBookId && selectedBook) {
      try {
        const data = {
          requesterId: userId,
          requestedBookId: selectedBook.id,
          ownerId: selectedBook.userId,
          offeredBookId: selectedBookId,
        };
        await exchangeRequest(data);
        toast.success("Exchange request created successfully");
        closeModal();
      } catch (error) {
        toast.error("Failed to create exchange request");
      }
    } else {
      toast.error("Please select a book to exchange.");
    }
  };

  const filteredBooks = (data || []).filter((book) => {
    const genreMatch =
      state.genreFilter === "all" ||
      book.genre.toLowerCase() === state.genreFilter.toLowerCase();
    const authorMatch = book.author
      .toLowerCase()
      .includes(state.authorFilter.toLowerCase());
    return genreMatch && authorMatch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <main className="p-8">
          <h1 className="text-3xl mb-8">Recommend Books</h1>
          <BookFilter
            genreFilter={state.genreFilter}
            authorFilter={state.authorFilter}
            onGenreChange={handleGenreChange}
            onAuthorChange={handleAuthorChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Card
                  key={book.id}
                  book={book}
                  isExchange
                  onExchange={() => handleExchangeClick(book)}
                />
              ))
            ) : (
              <p className="text-center text-2xl mt-10 text-gray-400">
                No matching books found.
              </p>
            )}
          </div>
        </main>
        {state.isModalOpen && (
          <Modal show={state.isModalOpen} onClose={closeModal}>
            <h2 className={styles.modalHeader}>Select a book to exchange</h2>
            <ul className={styles.bookList}>
              {state.bookList.map((userBook) => (
                <li
                  key={userBook.id}
                  className={`${styles.bookItem} ${
                    state.selectedBookId === userBook.id
                      ? styles.bookItemSelected
                      : ""
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
          </Modal>
        )}
      </div>
    </>
  );
};

export default MatchPage;
