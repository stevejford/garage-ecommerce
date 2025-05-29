"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  
  // Sample cart items for demonstration
  const cartItems = [
    {
      id: "1",
      name: "B&D Remote Control",
      price: 89.99,
      quantity: 1,
      image: "/placeholder-product.svg",
    },
    {
      id: "2",
      name: "Steel-Line Track Roller",
      price: 24.99,
      quantity: 2,
      image: "/placeholder-product.svg",
    },
  ];

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                        <span className="text-gray-500 text-sm">Image</span>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">Unit Price: ${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                            <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <Link href="/shop" className="text-blue-600 hover:text-blue-800 font-medium">
                      Continue Shopping
                    </Link>
                    
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Including taxes</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-sm">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              
              <Link 
                href="/shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
