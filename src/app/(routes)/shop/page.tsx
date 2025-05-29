import React from "react";
import Link from "next/link";

export default function ShopPage() {
  // Sample products for the shop page
  const products = [
    {
      id: "1",
      name: "B&D Remote Control",
      price: 89.99,
      category: "Remote Controls",
      brand: "B&D",
      image: "/placeholder-product.svg",
      slug: "bd-remote-control",
    },
    {
      id: "2",
      name: "Steel-Line Track Roller",
      price: 24.99,
      category: "Mechanical Parts",
      brand: "Steel-Line",
      image: "/placeholder-product.svg",
      slug: "steel-line-track-roller",
    },
    {
      id: "3",
      name: "Centurion Safety Beam",
      price: 129.99,
      category: "Safety Devices",
      brand: "Centurion",
      image: "/placeholder-product.svg",
      slug: "centurion-safety-beam",
    },
    {
      id: "4",
      name: "Taurean Spring Assembly",
      price: 79.99,
      category: "Mechanical Parts",
      brand: "Taurean",
      image: "/placeholder-product.svg",
      slug: "taurean-spring-assembly",
    },
    {
      id: "5",
      name: "Eco Garage Door Hinge",
      price: 14.99,
      category: "Mechanical Parts",
      brand: "Eco Garage Doors",
      image: "/placeholder-product.svg",
      slug: "eco-garage-door-hinge",
    },
    {
      id: "6",
      name: "Generic Remote Control",
      price: 49.99,
      category: "Remote Controls",
      brand: "Generic",
      image: "/placeholder-product.svg",
      slug: "generic-remote-control",
    },
  ];

  // Filter options
  const filters = {
    brands: ["All Brands", "B&D", "Steel-Line", "Centurion", "Taurean", "Eco Garage Doors", "Generic"],
    categories: ["All Categories", "Remote Controls", "Mechanical Parts", "Safety Devices", "Tracks & Rollers"],
    doorTypes: ["All Door Types", "Roller", "Sectional", "Tilt"],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Brands</h3>
            <div className="space-y-1">
              {filters.brands.map((brand, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${index}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`brand-${index}`} className="ml-2 text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="space-y-1">
              {filters.categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Door Types</h3>
            <div className="space-y-1">
              {filters.doorTypes.map((doorType, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`doorType-${index}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`doorType-${index}`} className="ml-2 text-sm text-gray-700">
                    {doorType}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <span>-</span>
              <input
                type="text"
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
        </div>

        {/* Main content with products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
              <select
                id="sort"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                href={`/shop/products/${product.slug}`}
                key={product.id}
                className="group"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{product.name}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.brand} | {product.category}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                Previous
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600"
              >
                1
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                2
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                3
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
