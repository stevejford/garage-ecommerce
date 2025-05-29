import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geelong Garage Doors | Shop",
  description: "Browse our selection of garage door parts and accessories",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}
