import React from "react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions about our products or need assistance with your garage door? 
          Fill out the form below and our team will get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(04) 1234 5678"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Product Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Garage Door Way<br />
                  Geelong, VIC 3220<br />
                  Australia
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <p className="text-gray-600">
                  (03) 5222 1234
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-gray-600">
                  info@geelonggaragedoors.com.au
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Do you offer installation services?</h3>
              <p className="text-gray-600">
                While we primarily supply garage door parts, we can recommend trusted local installers in the Geelong area.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">What is your shipping policy?</h3>
              <p className="text-gray-600">
                We offer free shipping on orders over $100 within Australia. Standard shipping typically takes 3-5 business days.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Do you have a physical showroom?</h3>
              <p className="text-gray-600">
                Yes, you can visit our showroom at our Geelong address during business hours to see our products in person.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
