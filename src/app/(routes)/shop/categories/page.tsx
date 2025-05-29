import React from "react";
import Link from "next/link";

export default function CategoriesPage() {
  // Sample categories for the categories page
  const categories = [
    { name: "Remote Controls", image: "/placeholder-category.svg", productCount: 28, slug: "remote-controls" },
    { name: "Mechanical Parts", image: "/placeholder-category.svg", productCount: 42, slug: "mechanical-parts" },
    { name: "Safety Devices", image: "/placeholder-category.svg", productCount: 15, slug: "safety-devices" },
    { name: "Tracks & Rollers", image: "/placeholder-category.svg", productCount: 23, slug: "tracks-rollers" },
    { name: "Springs & Cables", image: "/placeholder-category.svg", productCount: 19, slug: "springs-cables" },
    { name: "Motors & Openers", image: "/placeholder-category.svg", productCount: 31, slug: "motors-openers" },
    { name: "Panels & Sections", image: "/placeholder-category.svg", productCount: 17, slug: "panels-sections" },
    { name: "Accessories", image: "/placeholder-category.svg", productCount: 24, slug: "accessories" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
        <p className="text-gray-600">Find the perfect parts organized by category.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link 
            href={`/shop/categories/${category.slug}`} 
            key={index}
            className="group"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-gray-700">{category.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-500">{category.productCount} products</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
