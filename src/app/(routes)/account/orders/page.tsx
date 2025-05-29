"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

// Order status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Delivered: 'bg-green-100 text-green-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Processing: 'bg-orange-100 text-orange-800',
    Cancelled: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;
  
  return (
    <span className={`${style} text-xs px-2 py-1 rounded-full font-medium`}>
      {status}
    </span>
  );
};

// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "May 15, 2025",
    status: "Delivered",
    total: 149.97,
    items: [
      {
        name: "Sectional Garage Door - White",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center",
        deliveryDate: "May 18, 2025"
      }
    ],
    canTrack: true
  },
  {
    id: "ORD-12344",
    date: "May 10, 2025",
    status: "Shipped",
    total: 89.99,
    items: [
      {
        name: "Garage Door Remote Control",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=80&h=80&fit=crop&crop=center",
        expectedDelivery: "May 20, 2025"
      }
    ],
    canTrack: true
  },
  {
    id: "ORD-12343",
    date: "April 28, 2025",
    status: "Processing",
    total: 299.99,
    items: [
      {
        name: "Insulated Steel Garage Door",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop&crop=center"
      },
      {
        name: "Professional Installation",
        quantity: 1,
        service: true,
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=80&h=80&fit=crop&crop=center"
      }
    ],
    canTrack: false
  },
  {
    id: "ORD-12342",
    date: "April 15, 2025",
    status: "Delivered",
    total: 45.99,
    items: [
      {
        name: "Garage Door Lubricant Kit",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop&crop=center",
        deliveryDate: "April 18, 2025"
      }
    ],
    canBuyAgain: true
  }
];

export default function OrdersPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  // Show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }
  
  // Default view for unauthenticated users
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-inter text-2xl font-semibold text-gray-900">Sign In Required</h2>
            <p className="mt-2 font-geist text-base text-gray-600">Please sign in to view your orders</p>
          </div>
          <div className="material-card p-6">
            <p className="text-center mb-6">You need to be signed in to view your order history.</p>
            <Link href="/auth/sign-in" className="material-button-primary w-full flex justify-center">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-stone-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-gray-600 hover:text-gray-900">
                <FaArrowLeft />
              </Link>
              <h1 className="font-inter text-2xl font-semibold text-gray-900 tracking-normal">My Orders</h1>
            </div>
            <Link 
              href="/shop" 
              className="material-button-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="material-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Orders</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Last 6 months</option>
                <option>Last month</option>
                <option>Last 3 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {orders.length} orders
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="material-card border">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <OrderStatusBadge status={order.status} />
                      <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    {order.canTrack ? (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Track Package</button>
                    ) : (
                      <button className="text-gray-400 text-sm font-medium cursor-not-allowed">Track Package</button>
                    )}
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Invoice</button>
                    {order.canBuyAgain && (
                      <button className="material-button-primary px-3 py-1 text-sm">Buy Again</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.service ? "Service" : `Quantity: ${item.quantity}`}
                        </p>
                        {item.deliveryDate && (
                          <p className="text-sm text-green-600 mt-1">Delivered on {item.deliveryDate}</p>
                        )}
                        {item.expectedDelivery && (
                          <p className="text-sm text-blue-600 mt-1">Expected delivery: {item.expectedDelivery}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-600">
            Showing 1-4 of 12 orders
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
