"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Information, 2: Shipping, 3: Payment, 4: Review
  
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

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Place order and redirect to confirmation
      router.push('/checkout/confirmation');
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                1
              </div>
              <span className="text-sm">Information</span>
            </div>
            <div className={`flex-grow border-t ${step >= 2 ? 'border-blue-600' : 'border-gray-200'} mx-4`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className={`flex-grow border-t ${step >= 3 ? 'border-blue-600' : 'border-gray-200'} mx-4`}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                3
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className={`flex-grow border-t ${step >= 4 ? 'border-blue-600' : 'border-gray-200'} mx-4`}></div>
            <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                4
              </div>
              <span className="text-sm">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Step 1: Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                        Keep me updated with news and exclusive offers
                      </label>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        id="state"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select State</option>
                        <option value="VIC">Victoria</option>
                        <option value="NSW">New South Wales</option>
                        <option value="QLD">Queensland</option>
                        <option value="WA">Western Australia</option>
                        <option value="SA">South Australia</option>
                        <option value="TAS">Tasmania</option>
                        <option value="ACT">Australian Capital Territory</option>
                        <option value="NT">Northern Territory</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Shipping */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-4 border border-gray-300 rounded-md">
                      <input
                        type="radio"
                        id="standard"
                        name="shipping"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="standard" className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-700">Standard Shipping</span>
                        <span className="block text-sm text-gray-500">3-5 business days</span>
                      </label>
                      <span className="ml-auto font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center p-4 border border-gray-300 rounded-md">
                      <input
                        type="radio"
                        id="express"
                        name="shipping"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="express" className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-700">Express Shipping</span>
                        <span className="block text-sm text-gray-500">1-2 business days</span>
                      </label>
                      <span className="ml-auto font-medium">$25.00</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-4 border border-gray-300 rounded-md">
                      <input
                        type="radio"
                        id="creditCard"
                        name="payment"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-md ml-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="nameOnCard"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 border border-gray-300 rounded-md">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>
                    
                    <div className="flex items-center p-4 border border-gray-300 rounded-md">
                      <input
                        type="radio"
                        id="afterpay"
                        name="payment"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="afterpay" className="ml-3 block text-sm font-medium text-gray-700">
                        Afterpay
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4: Review */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  
                  <div className="space-y-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <p className="text-gray-600">john.doe@example.com</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                      <p className="text-gray-600">
                        John Doe<br />
                        123 Main Street<br />
                        Geelong, VIC 3220<br />
                        Australia<br />
                        Phone: (04) 1234 5678
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium mb-2">Shipping Method</h3>
                      <p className="text-gray-600">
                        Standard Shipping (3-5 business days)
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                      <p className="text-gray-600">
                        Credit Card ending in 3456
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium mb-2">Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Return to Cart
                  </Link>
                )}
                
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {step < 4 ? 'Continue' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-gray-200">
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
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
