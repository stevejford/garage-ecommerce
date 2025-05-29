import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Geelong Garage Doors</h3>
            <p className="text-gray-400">Specialized supplier of garage door parts in Australia.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop/brands" className="text-gray-400 hover:text-white transition-colors">Brands</Link></li>
              <li><Link href="/shop/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">FB</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">IG</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">TW</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Geelong Garage Doors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
