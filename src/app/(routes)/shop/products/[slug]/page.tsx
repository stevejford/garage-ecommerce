"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";

// This would normally come from a database
const getProductData = (slug: string) => {
  // Mock product data
  const products = [
    {
      id: "1",
      slug: "bd-remote-control",
      name: "B&D Remote Control",
      price: 89.99,
      category: "Remote Controls",
      brand: "B&D",
      doorTypes: ["Roller", "Sectional"],
      description: "Universal remote control compatible with all B&D garage door openers manufactured after 1997. Features rolling code technology for enhanced security.",
      compatibilityNotes: "Compatible with B&D models: Controll-A-Door P Diamond, Controll-A-Door S, Controll-A-Door Power Drive, Controll-A-Door Advance",
      features: [
        "Rolling code technology",
        "Up to 100m range",
        "Battery included",
        "Easy programming",
        "Weather resistant"
      ],
      specifications: {
        "Dimensions": "8.5 x 5.2 x 2.1 cm",
        "Weight": "45g",
        "Battery Type": "CR2032 3V Lithium",
        "Frequency": "433.92 MHz",
        "Warranty": "24 months"
      },
      stockQty: 15,
      images: ["/placeholder-product.svg"],
      manuals: [
        { name: "User Manual", url: "#" },
        { name: "Programming Guide", url: "#" }
      ],
      relatedProducts: [
        { id: "2", name: "B&D Wall Button", slug: "bd-wall-button", price: 29.99 },
        { id: "3", name: "B&D Battery Replacement Kit", slug: "bd-battery-kit", price: 14.99 }
      ]
    },
    {
      id: "2",
      slug: "steel-line-track-roller",
      name: "Steel-Line Track Roller",
      price: 24.99,
      category: "Mechanical Parts",
      brand: "Steel-Line",
      doorTypes: ["Sectional"],
      description: "Heavy-duty nylon roller with sealed bearings for smooth and quiet operation. Designed for Steel-Line sectional garage doors.",
      compatibilityNotes: "Fits all Steel-Line sectional garage doors. Also compatible with most other sectional door brands with standard track sizes.",
      features: [
        "Sealed bearings for long life",
        "Quiet operation",
        "Nylon construction reduces wear on tracks",
        "Easy installation",
        "Corrosion resistant"
      ],
      specifications: {
        "Dimensions": "5.7 x 2.5 cm",
        "Shaft Diameter": "11mm",
        "Material": "Nylon with steel shaft",
        "Bearing Type": "Sealed ball bearing",
        "Warranty": "12 months"
      },
      stockQty: 32,
      images: ["/placeholder-product.svg"],
      manuals: [
        { name: "Installation Guide", url: "#" }
      ],
      relatedProducts: [
        { id: "4", name: "Steel-Line Track Bracket", slug: "steel-line-track-bracket", price: 18.99 },
        { id: "5", name: "Steel-Line Hinge Set", slug: "steel-line-hinge-set", price: 34.99 }
      ]
    }
  ];

  return products.find(product => product.slug === slug) || null;
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Using React.use() to unwrap the params promise as required by Next.js 15
  const unwrappedParams = use(params);
  const product = getProductData(unwrappedParams.slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link 
          href="/shop" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stockQty) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stockQty) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href={`/shop/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            {product.images.length > 0 ? (
              <div className="relative w-full h-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-gray-500">{product.name}</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center cursor-pointer">
                  <span className="text-gray-500">Image {index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <Link href={`/shop/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
              {product.brand}
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <span className="text-gray-500">SKU: {product.id}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Door Type Compatibility:</h3>
            <div className="flex flex-wrap gap-2">
              {product.doorTypes.map((type, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${product.stockQty > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
              <span className={`text-sm font-medium ${product.stockQty > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {product.stockQty > 0 ? `In Stock (${product.stockQty} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          {product.stockQty > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex border border-gray-300 rounded-md mr-4">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 border-r border-gray-300 text-gray-500 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stockQty}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-3 py-2 text-center focus:outline-none"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 border-l border-gray-300 text-gray-500 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* Manuals */}
          {product.manuals.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Documentation:</h3>
              <div className="space-y-2">
                {product.manuals.map((manual, index) => (
                  <a 
                    key={index} 
                    href={manual.url}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                      />
                    </svg>
                    {manual.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "specifications"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("compatibility")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "compatibility"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Compatibility
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <h4 className="text-md font-medium text-gray-900 mb-2">Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
              <div className="border-t border-gray-200">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className={`py-3 ${index !== Object.entries(product.specifications).length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="grid grid-cols-3">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "compatibility" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compatibility Information</h3>
              <p className="text-gray-700 mb-4">{product.compatibilityNotes}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Not sure if this part is compatible with your garage door? Contact our support team for assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                href={`/shop/products/${relatedProduct.slug}`}
                key={relatedProduct.id}
                className="group"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{relatedProduct.name}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
