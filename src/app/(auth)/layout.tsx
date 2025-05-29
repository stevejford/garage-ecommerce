import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Geelong Garage Doors | Authentication",
  description: "Sign in or sign up to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-8 pb-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">Geelong Garage Doors</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
