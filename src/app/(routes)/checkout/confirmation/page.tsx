import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  // Sample order details
  const orderDetails = {
    orderNumber: "GGD-12345",
    date: "May 22, 2025",
    total: 139.97,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Geelong",
      state: "VIC",
      postcode: "3220",
      country: "Australia",
    },
    items: [
      {
        id: "1",
        name: "B&D Remote Control",
        price: 89.99,
        quantity: 1,
      },
      {
        id: "2",
        name: "Steel-Line Track Roller",
        price: 24.99,
        quantity: 2,
      },
    ],
    shippingMethod: "Standard Shipping",
    paymentMethod: "Credit Card ending in 3456",
  };

  // Calculate totals
  const subtotal = orderDetails.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Order #{orderDetails.orderNumber}</h2>
              <p className="text-gray-600">Placed on {orderDetails.date}</p>
            </div>
            <Link 
              href="/account/orders"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Orders
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Order Details</h3>
            
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            <p className="text-gray-600">
              {orderDetails.shippingAddress.name}<br />
              {orderDetails.shippingAddress.street}<br />
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postcode}<br />
              {orderDetails.shippingAddress.country}
            </p>
            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-medium">Shipping Method:</span> {orderDetails.shippingMethod}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Payment Information</h3>
            <p className="text-gray-600">
              <span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}
            </p>
            <p className="text-gray-600 mt-4">
              <span className="font-medium">Billing Address:</span> Same as shipping address
            </p>
          </div>
        </div>

        <div className="mt-8 text-center space-y-6">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          
          <div className="space-x-4">
            <Link 
              href="/shop"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/account"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Go to My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
