"use client";

import React from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-8 z-50">
      <Link
        href="/"
        className="text-cyan-400 text-2xl font-bold tracking-wide hover:text-white transition-all"
      >
        GAVINA<span className="text-white">AUTH</span>
      </Link>

      <ul className="flex items-center gap-6 text-gray-300">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        {user && <li><Link href="/profile">Profile</Link></li>}
        {user && (
          <li
            onClick={logOut}
            className="cursor-pointer text-red-500 hover:text-red-400 transition-all"
          >
            Sign Out
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
