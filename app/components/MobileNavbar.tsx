"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

function MobileNavbar({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Icon */}
      <button className="text-2xl focus:outline-none" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-customGray py-6 px-8 shadow-lg z-50">
          <nav className="flex flex-col items-center space-y-6">
            <Link
              className="text-lg font-medium no-underline hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-300"
              href={"/add-blog "}
              onClick={toggleMenu}
            >
              Upload Your Blog
            </Link>
            <Link
              className="text-lg font-medium no-underline hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-300"
              href={"/blogs "}
              onClick={toggleMenu}
            >
              All Blogs
            </Link>
            {/* SignIn/SignOut */}
            <div className="w-full flex justify-center" onClick={toggleMenu}>
              {session ? <SignOut /> : <SignIn />}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNavbar;
