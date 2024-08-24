"use client";
import { logoutUser } from "@/app/store/queries";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("userId");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="p-4 bg-gray-800 flex justify-between items-center">
      <div>
        <Link href="/">
          <h1 className="text-1xl text-white">BOOKS-STORE</h1>
        </Link>
      </div>
      <div className="space-x-4 text-white">
        <Link href="/">
          <button className="hover:text-gray-400">Home</button>
        </Link>
        <Link href="/discovery">
          <button className="hover:text-gray-400">List Book</button>
        </Link>
        <Link href="/recommend">
          <button className="hover:text-gray-400">Matching</button>
        </Link>
        <Link href="/exchange">
          <button className="hover:text-gray-400">Exchange Request</button>
        </Link>
        <button className="hover:text-red-400" onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
