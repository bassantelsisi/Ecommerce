// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/freshcart-logo.svg'

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="mb-4">
            <Link to="/" className="flex items-center">
              <img
                src={Logo} // Replace with your logo path
                alt="Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
    {/* Facebook */}
    <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 items-center hover:text-blue-600 transition-colors"
    >
        <svg
            className="w-8 h-8"  // Increased size from w-6 h-6
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
            />
        </svg>
    </a>

    

    {/* YouTube */}
    <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600  hover:text-red-600 transition-colors"
    >
        <svg 
            className="w-8 h-8"
            fill="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
        >
            <path 
                fillRule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                clipRule="evenodd"
            />
        </svg>
    </a>
    
</div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}