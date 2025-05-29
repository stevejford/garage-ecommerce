import React from "react";
import Link from "next/link";

export default function BrandsPage() {
  // Sample brands for the brands page
  const brands = [
    { name: "B&D", logo: "/placeholder-brand.svg", productCount: 24, slug: "bd" },
    { name: "Steel-Line", logo: "/placeholder-brand.svg", productCount: 18, slug: "steel-line" },
    { name: "Centurion", logo: "/placeholder-brand.svg", productCount: 15, slug: "centurion" },
    { name: "Taurean", logo: "/placeholder-brand.svg", productCount: 12, slug: "taurean" },
    { name: "Eco Garage Doors", logo: "/placeholder-brand.svg", productCount: 10, slug: "eco-garage-doors" },
    { name: "Generic", logo: "/placeholder-brand.svg", productCount: 8, slug: "generic" },
    { name: "Merlin", logo: "/placeholder-brand.svg", productCount: 14, slug: "merlin" },
    { name: "Gliderol", logo: "/placeholder-brand.svg", productCount: 9, slug: "gliderol" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop by Brand</h1>
        <p className="text-gray-600">Browse products from all major garage door manufacturers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <Link 
            href={`/shop/brands/${brand.slug}`} 
            key={index}
            className="group"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-gray-700">{brand.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
                <span className="text-sm text-gray-500">{brand.productCount} products</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
