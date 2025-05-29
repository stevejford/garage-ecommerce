import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export default async function CustomersPage() {
  // In a real implementation, we would fetch customers from the database
  // For now, we'll use placeholder data
  const customers = [
    {
      id: "cust-1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "0412 345 678",
      totalOrders: 5,
      totalSpent: 1250.75,
      lastOrderDate: new Date("2025-05-15"),
      createdAt: new Date("2024-11-10"),
    },
    {
      id: "cust-2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "0423 456 789",
      totalOrders: 3,
      totalSpent: 875.50,
      lastOrderDate: new Date("2025-05-20"),
      createdAt: new Date("2025-01-05"),
    },
    {
      id: "cust-3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "0434 567 890",
      totalOrders: 1,
      totalSpent: 350.00,
      lastOrderDate: new Date("2025-05-22"),
      createdAt: new Date("2025-05-10"),
    },
    {
      id: "cust-4",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "0445 678 901",
      totalOrders: 8,
      totalSpent: 2450.25,
      lastOrderDate: new Date("2025-05-18"),
      createdAt: new Date("2024-08-15"),
    },
    {
      id: "cust-5",
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "0456 789 012",
      totalOrders: 2,
      totalSpent: 725.00,
      lastOrderDate: new Date("2025-04-30"),
      createdAt: new Date("2025-03-20"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link
          href="/admin/customers/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Customer
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Customers</option>
                <option value="recent">Recent Customers</option>
                <option value="frequent">Frequent Buyers</option>
                <option value="high-value">High Value</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Customer since {customer.createdAt.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.lastOrderDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/customers/${customer.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> customers
          </div>
          <div className="flex space-x-2">
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-2">Customer Segments</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">New Customers (30 days)</div>
                <div className="text-sm font-medium">1</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Returning Customers</div>
                <div className="text-sm font-medium">3</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">VIP Customers (>$1000)</div>
                <div className="text-sm font-medium">2</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Inactive (>90 days)</div>
                <div className="text-sm font-medium">0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-2">Customer Insights</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Average Order Value</div>
                <div className="text-sm font-medium">{formatCurrency(1130.30)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Customer Lifetime Value</div>
                <div className="text-sm font-medium">{formatCurrency(1930.50)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Repeat Purchase Rate</div>
                <div className="text-sm font-medium">60%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Average Orders per Customer</div>
                <div className="text-sm font-medium">3.8</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-2">Customer Actions</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Customers
              </button>
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email Campaign
              </button>
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Create Customer Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
