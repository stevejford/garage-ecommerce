"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  
  // Check if the current path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              Geelong Garage Doors
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/shop"
                className={`${
                  isActive("/shop")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                } px-3 py-2 text-sm font-medium`}
              >
                Shop
              </Link>
              <Link
                href="/shop/brands"
                className={`${
                  isActive("/shop/brands")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                } px-3 py-2 text-sm font-medium`}
              >
                Brands
              </Link>
              <Link
                href="/shop/categories"
                className={`${
                  isActive("/shop/categories")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                } px-3 py-2 text-sm font-medium`}
              >
                Categories
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive("/contact")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                } px-3 py-2 text-sm font-medium`}
              >
                Contact
              </Link>
              <Link
                href="/returns"
                className={`${
                  isActive("/returns")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                } px-3 py-2 text-sm font-medium`}
              >
                Returns
              </Link>
            </nav>
          </div>

          {/* Secondary Navigation and Auth */}
          <div className="flex items-center space-x-4">
            {/* Admin Dashboard Link - Only show if user has admin role */}
            {isLoaded && isSignedIn && (user?.publicMetadata?.role === "admin" || user?.publicMetadata?.isAdmin === true) && (
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative group flex items-center"
            >
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 group-hover:text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
              </div>
              <span className="sr-only">Cart</span>
            </Link>

            {/* Auth Buttons */}
            {isLoaded && !isSignedIn ? (
              <div className="flex items-center space-x-3">
                <Link href="/auth/sign-in">
                  <button className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Log in
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Create Account
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/account"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  My Account
                </Link>
                <UserButton
                  appearance={{
                    baseTheme: dark,
                    elements: {
                      userButtonAvatarBox: 'w-10 h-10',
                      userButtonBox: 'w-10 h-10'
                    }
                  }}
                  userProfileMode="modal"
                  afterSignOutUrl="/"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
