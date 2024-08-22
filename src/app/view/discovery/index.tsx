"use client";
import Card from "@/app/components/card";
import { useState } from "react";
import { useGetBook, useUsersAllBooks } from "@/app/store/queries";

const Discovery = () => {
  const userId = localStorage.getItem("userId");
  const { data } = useUsersAllBooks(userId);

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

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-8">
        <h1 className="text-4xl mb-8">Browse All Books</h1>

        <div className="mb-4">
          <label className="mr-2">Genre:</label>
          <select
            className="p-2 text-black"
            value={genreFilter}
            onChange={handleGenreChange}
          >
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
            value={authorFilter}
            onChange={handleAuthorChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filteredBooks?.map((book) => <Card key={book.id} book={book} />)}
        </div>
      </main>
    </div>
  );
};

export default Discovery;
