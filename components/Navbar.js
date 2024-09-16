"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#444444] text-white sticky top-0 lg:px-16 shadow-lg z-50">
      <div className="container mx-auto px-4 py-5 lg:py-3 flex justify-between items-center">
        <Link href="/">
          <p className="lg:text-3xl text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-blue-300 to-purple-400 hover:underline cursor-pointer">
            RecipeRover
          </p>
        </Link>
        <div className="hidden lg:flex space-x-4">
          <Link href="/">
            <p className="hover:bg-gray-600 px-3 py-2 rounded">Home</p>
          </Link>
          <Link href="/recipes" target='_blank'>
            <p className="hover:bg-gray-600 px-3 py-2 rounded">Recipes</p>
          </Link>
          <Link href="/about" target='_blank'>
            <p className="hover:bg-gray-600 px-3 py-2 rounded">About</p>
          </Link>
          <Link href="/contact" target='_blank'>
            <p className="hover:bg-gray-600 px-3 py-2 rounded">Contact</p>
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className={`lg:hidden text-white focus:outline-none relative flex flex-col gap-[2px]`}
        >
          <div
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-45 translate-y-1' : ''}`}
          />
          <div
            className={`h-0.5 w-6 bg-white my-1 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <div
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'transform -rotate-45 -translate-y-1' : ''}`}
          />
        </button>
      </div>
      <div
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-[#555555]`}
      >
         <Link href="/">
          <p className="block px-4 py-2 hover:bg-gray-600">Home</p>
        </Link>

        <Link href="/recipes" target='_blank'>
          <p className="block px-4 py-2 hover:bg-gray-600">Recipes</p>
        </Link>
        <Link href="/about" target='_blank'>
          <p className="block px-4 py-2 hover:bg-gray-600">About</p>
        </Link>
        <Link href="/contact" target='_blank'>
          <p className="block px-4 py-2 hover:bg-gray-600">Contact</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
