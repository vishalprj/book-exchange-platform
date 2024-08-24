"use client";
import Card from "@/app/components/card";
import { useState } from "react";
import {
  exchangeRequest,
  listBook,
  useUsersAllBooks,
} from "@/app/store/queries";
import Modal from "@/app/components/model";
import styles from "./discovery.module.css";
import toast from "react-hot-toast";

const Discovery = () => {
  const userId = localStorage.getItem("userId");
  const { data } = useUsersAllBooks(userId);
  const [genreFilter, setGenreFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [bookList, setBookList] = useState([]);

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthorFilter(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleExchangeClick = async (book) => {
    setIsModalOpen(true);
    const listData = await listBook(userId); // Fetch the books that the current user can offer for exchange
    setBookList(listData);
    setSelectedBook(book); // Set the book that the user wants to request
  };

  const handleBookSelection = (bookId) => {
    setSelectedBookId(bookId); // Set the ID of the book that the user is offering for exchange
  };

  const handleProceedWithExchange = async () => {
    if (selectedBookId) {
      try {
        const data = {
          requesterId: userId, // ID of the user making the exchange request
          requestedBookId: selectedBook.id, // ID of the book being requested
          ownerId: selectedBook.userId, // ID of the owner of the book being requested
          offeredBookId: selectedBookId, // ID of the book being offered for exchange
        };
        await exchangeRequest(data); // Send the exchange request
        toast.success("Exchange request created successfully");
      } catch (error) {
        toast.error("Failed to create exchange request");
      }
      setIsModalOpen(false);
    } else {
      alert("Please select a book to exchange.");
    }
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

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-8">
        <h1 className="text-4xl mb-8">Browse All Books</h1>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredBooks?.map((book) => (
            <Card
              key={book.id}
              book={book}
              isExchange
              onExchange={() => handleExchangeClick(book)}
            />
          ))}
        </div>
      </main>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal}>
          <h2 className={styles.modalHeader}>Select a Book to Exchange</h2>
          <ul className={styles.bookList}>
            {bookList?.map((userBook) => (
              <li
                key={userBook.id}
                className={`${styles.bookItem} ${
                  selectedBookId === userBook.id ? styles.bookItemSelected : ""
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
  );
};

export default Discovery;
