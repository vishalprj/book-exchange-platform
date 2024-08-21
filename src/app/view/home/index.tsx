"use client";
import Card from "@/app/components/card";
import Modal from "@/app/components/model";
import { useState } from "react";
import styles from "./home.module.css";
import { useForm } from "react-hook-form";
import { useAddBook, useGetBook } from "@/app/store/queries";
const HomePage = () => {
  const { register, handleSubmit } = useForm();
  const { data } = useGetBook();
  const { mutate: addBook } = useAddBook();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewBookClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    const addData = {
    ...data,
      userId: "66c4cb1d38bfb1ed8d1b8ab6",
    };
    addBook(addData);
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-4 bg-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-1xl">BOOKS-STORE</h1>
        </div>
        <div className="space-x-4">
          <button className="hover:text-gray-400">List Book</button>
          <button className="hover:text-gray-400">Matching</button>
          <button className="hover:text-gray-400">Exchange Request</button>
          <button className="hover:text-red-400">Logout</button>
        </div>
      </nav>

      {/* Content */}
      <main className="p-8">
        <h1 className="text-4xl mb-8">Browse Books</h1>

        {/* Filters */}
        <div className="mb-4">
          <label className="mr-2">Genre:</label>
          <select className="p-2 text-black">
            <option value="all">All</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science">Science</option>
            <option value="fantasy">Fantasy</option>
          </select>

          <label className="ml-4 mr-2">Author:</label>
          <input
            className="p-2 text-black"
            type="text"
            placeholder="Author Name"
          />

          <button
            onClick={handleAddNewBookClick}
            className="ml-4 p-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Add New Book
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {data?.map((book) => <Card key={book.id} book={book} />)}
        </div>
      </main>

      {/* Add Book Modal */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              {...register("title")}
              className={styles.input}
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Author:</label>
            <input
              type="text"
              {...register("author")}
              className={styles.input}
              placeholder="Enter author's name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Genre:</label>
            <input
              {...register("genre")}
              className={styles.input}
              placeholder="Enter book genre"
              required
            />
          </div>
          <button
            type="submit"
            className="mr-2 p-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Add Book
          </button>
          <button
            onClick={handleCloseModal}
            className="p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
