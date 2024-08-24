import React from "react";

export type filterProps = {
  genreFilter: string;
  authorFilter: string;
  onGenreChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAddBook?: boolean;
  openAddBookModal?: () => void;
};

const BookFilter = ({
  genreFilter,
  authorFilter,
  onGenreChange,
  onAuthorChange,
  openAddBookModal,
  isAddBook,
}: filterProps) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center">
      <div className="mb-2 sm:mb-0 sm:mr-4 flex items-center">
        <label className="mr-2 text-lg">Genre:</label>
        <select
          className="p-2 bg-gray-800 text-white rounded-lg border border-gray-700"
          value={genreFilter}
          onChange={onGenreChange}
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
          onChange={onAuthorChange}
        />
      </div>
      {isAddBook && (
        <button
          onClick={openAddBookModal}
          className="btn ml-0 sm:ml-4 mt-4 sm:mt-0 bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Add New Book
        </button>
      )}
    </div>
  );
};

export default BookFilter;
