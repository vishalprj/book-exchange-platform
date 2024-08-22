import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 flex justify-between items-center">
      <div>
        <h1 className="text-1xl text-white">BOOKS-STORE</h1>
      </div>
      <div className="space-x-4 text-white">
        <Link href="/">
          <button className="hover:text-gray-400">Home</button>
        </Link>
        <Link href="/discovery">
          <button className="hover:text-gray-400">List Book</button>
        </Link>
        <button className="hover:text-gray-400">Matching</button>
        <button className="hover:text-gray-400">Exchange Request</button>
        <button className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
