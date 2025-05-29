import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Geelong Garage Doors',
  description: 'Information about our shipping policies, delivery times, and costs for garage doors and accessories',
};

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shipping & Delivery Information</h1>
        <p className="text-gray-600">Last updated: May 22, 2025</p>
      </div>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
          <p>
            At Geelong Garage Doors, we're committed to providing reliable and efficient shipping services for all our products. 
            We understand that receiving your garage door parts and accessories in a timely manner is important to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
          <p>We currently ship to all locations within Australia. International shipping is not available at this time.</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-3">Local Delivery (Geelong Area)</h3>
            <p>For customers within the Geelong metropolitan area, we offer:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Free delivery for orders over $200</li>
              <li>$15 flat rate delivery for orders under $200</li>
              <li>Same-day delivery available for orders placed before 11 AM (Monday-Friday)</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-3">Victoria (Outside Geelong)</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Free delivery for orders over $350</li>
              <li>$25 flat rate delivery for orders under $350</li>
              <li>1-3 business days delivery timeframe</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-3">Australia-Wide</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Free delivery for orders over $500</li>
              <li>Shipping costs calculated at checkout based on weight and destination</li>
              <li>3-7 business days delivery timeframe</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
          <p>We partner with the following carriers to ensure your products arrive safely and on time:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Standard Shipping:</strong> Australia Post or StarTrack (3-7 business days)</li>
            <li><strong>Express Shipping:</strong> TNT or Toll Priority (1-3 business days)</li>
            <li><strong>Local Delivery:</strong> Our own delivery fleet for the Geelong area</li>
          </ul>
          <p className="mt-4">The shipping method will be selected based on your location and the size/weight of your order.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Oversized and Heavy Items</h2>
          <p>
            For large items such as complete garage doors or motor systems, special shipping arrangements may be required. 
            Our customer service team will contact you to confirm delivery details and any additional charges that may apply.
          </p>
          <p className="mt-4">
            Additional fees may apply for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Remote or difficult-to-access locations</li>
            <li>Items requiring special handling</li>
            <li>Expedited delivery requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
          <p>
            Once your order has been shipped, you will receive a confirmation email with tracking information. 
            You can track your order by:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Clicking the tracking link in your shipping confirmation email</li>
            <li>Logging into your account on our website and viewing your order history</li>
            <li>Contacting our customer service team with your order number</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Times</h2>
          <p>
            Delivery times are estimates and may vary depending on your location and other factors. 
            Please note that delivery times do not include weekends or public holidays.
          </p>
          <p className="mt-4">
            Factors that may affect delivery times include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Extreme weather conditions</li>
            <li>Remote locations</li>
            <li>High volume periods (e.g., holiday seasons)</li>
            <li>Customs clearance for certain areas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Installation Services</h2>
          <p>
            For customers in the Geelong area, we offer professional installation services for an additional fee. 
            Please contact our customer service team for more information and to schedule an installation appointment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about shipping or delivery, please contact us:</p>
          <ul className="list-none pl-0 mt-4 space-y-2">
            <li>Email: <a href="mailto:shipping@geelonggaragedoors.com.au" className="text-blue-600 hover:underline">shipping@geelonggaragedoors.com.au</a></li>
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

export default ShippingPage;
