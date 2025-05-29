import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns Policy | Geelong Garage Doors',
  description: 'Our returns and refunds policy for garage doors and accessories',
};

const ReturnsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Returns & Refunds Policy</h1>
        <p className="text-gray-600">Last updated: May 22, 2025</p>
      </div>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            At Geelong Garage Doors, we stand behind the quality of our products. We understand that sometimes a product may not meet your expectations or may arrive damaged. This returns policy outlines the process for returning products and requesting refunds.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
          <p>You may return items purchased from Geelong Garage Doors within 30 days of delivery for a full refund, provided that:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>The item is in its original condition</li>
            <li>The item is in its original packaging</li>
            <li>You have the original receipt or proof of purchase</li>
            <li>The item is not on our list of non-returnable items</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Custom-made or personalized garage doors</li>
            <li>Special order items</li>
            <li>Items marked as "Final Sale" or "Clearance"</li>
            <li>Items that have been installed or used</li>
            <li>Digital products or software</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
          <ol className="list-decimal pl-6 mt-4 space-y-4">
            <li>
              <strong>Contact Us:</strong> Before returning any item, please contact our customer service team at <a href="mailto:returns@geelonggaragedoors.com.au" className="text-blue-600 hover:underline">returns@geelonggaragedoors.com.au</a> or call us at (03) 5222-1234 to obtain a Return Merchandise Authorization (RMA) number.
            </li>
            <li>
              <strong>Package Your Return:</strong> Securely package the item in its original packaging, including all accessories, manuals, and parts.
            </li>
            <li>
              <strong>Include Documentation:</strong> Include your RMA number, order number, and a brief explanation for the return.
            </li>
            <li>
              <strong>Ship Your Return:</strong> Ship the item to the address provided by our customer service team. We recommend using a trackable shipping method.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
          <p>Once we receive and inspect your return, we will notify you of the status of your refund.</p>
          <p className="mt-4">If approved, your refund will be processed within 5-7 business days. The refund will be credited to the original payment method used for the purchase.</p>
          <p className="mt-4">Please note that shipping costs are non-refundable, and you will be responsible for the cost of return shipping.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
          <p>If you receive a damaged or defective item, please contact us immediately at <a href="mailto:support@geelonggaragedoors.com.au" className="text-blue-600 hover:underline">support@geelonggaragedoors.com.au</a> or call (03) 5222-1234.</p>
          <p className="mt-4">Please provide photos of the damaged item and packaging. We will arrange for a replacement or refund at no additional cost to you.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about our returns policy, please contact us:</p>
          <ul className="list-none pl-0 mt-4 space-y-2">
            <li>Email: <a href="mailto:support@geelonggaragedoors.com.au" className="text-blue-600 hover:underline">support@geelonggaragedoors.com.au</a></li>
            <li>Phone: (03) 5222-1234</li>
            <li>Address: 123 Main Street, Geelong VIC 3220, Australia</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 flex justify-center">
        <Link 
          href="/shop"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-sm font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ReturnsPage;
