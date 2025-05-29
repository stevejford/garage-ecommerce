import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

interface CustomerPageProps {
  params: {
    customerId: string;
  };
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { customerId } = params;
  
  // In a real implementation, we would fetch the customer from the database
  // For now, we'll use placeholder data
  const customer = {
    id: customerId,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "0412 345 678",
    totalOrders: 5,
    totalSpent: 1250.75,
    lastOrderDate: new Date("2025-05-15"),
    createdAt: new Date("2024-11-10"),
    addresses: [
      {
        id: "addr-1",
        type: "billing",
        line1: "123 Main Street",
        line2: "",
        city: "Geelong",
        state: "VIC",
        postcode: "3220",
        country: "Australia",
        isDefault: true,
      },
      {
        id: "addr-2",
        type: "shipping",
        line1: "456 High Street",
        line2: "Unit 7",
        city: "Geelong",
        state: "VIC",
        postcode: "3220",
        country: "Australia",
        isDefault: true,
      },
    ],
    orders: [
      {
        id: "order-1",
        orderNumber: "GGD-10001",
        date: new Date("2025-05-15"),
        status: "completed",
        total: 350.75,
        items: 3,
      },
      {
        id: "order-2",
        orderNumber: "GGD-10002",
        date: new Date("2025-04-20"),
        status: "completed",
        total: 275.00,
        items: 2,
      },
      {
        id: "order-3",
        orderNumber: "GGD-10003",
        date: new Date("2025-03-10"),
        status: "completed",
        total: 425.00,
        items: 4,
      },
      {
        id: "order-4",
        orderNumber: "GGD-10004",
        date: new Date("2025-02-05"),
        status: "completed",
        total: 150.00,
        items: 1,
      },
      {
        id: "order-5",
        orderNumber: "GGD-10005",
        date: new Date("2025-01-15"),
        status: "completed",
        total: 50.00,
        items: 1,
      },
    ],
    notes: [
      {
        id: "note-1",
        date: new Date("2025-05-16"),
        author: "Admin",
        content: "Customer called about installation services for their recent garage door purchase.",
      },
      {
        id: "note-2",
        date: new Date("2025-04-21"),
        author: "Admin",
        content: "Followed up on satisfaction with recent order. Customer is very happy with the product.",
      },
    ],
  };

  // If customer not found, return 404
  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg mr-4">
            {customer.name.split(" ").map(n => n[0]).join("")}
          </div>
          <h1 className="text-3xl font-bold">{customer.name}</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/admin/customers/${customer.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Edit Customer
          </Link>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Delete Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Customer Information</h2>
            </div>
            <div className="p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Customer Since</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.createdAt.toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Order</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.lastOrderDate.toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Orders</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.totalOrders}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Spent</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatCurrency(customer.totalSpent)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Order History</h2>
              <Link
                href={`/admin/orders/new?customerId=${customer.id}`}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Create Order
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">{order.orderNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.date.toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.items}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Addresses */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Addresses</h2>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Add Address
              </button>
            </div>
            <div className="p-6 space-y-6">
              {customer.addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-md p-4 relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded capitalize">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="ml-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>{address.city}, {address.state} {address.postcode}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Notes */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Notes</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <textarea
                  rows={3}
                  className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Add a note about this customer..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Note
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {customer.notes.map((note) => (
                  <div key={note.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium text-gray-900">{note.author}</div>
                      <div className="text-xs text-gray-500">{note.date.toLocaleDateString()}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">{note.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
