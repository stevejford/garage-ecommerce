import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export default async function AnalyticsPage() {
  // In a real implementation, we would fetch analytics data from the database
  // For now, we'll use placeholder data
  const salesData = {
    today: 1250.75,
    yesterday: 975.50,
    thisWeek: 5430.25,
    lastWeek: 4875.00,
    thisMonth: 22450.75,
    lastMonth: 19875.50,
    thisYear: 125750.25,
  };

  const orderStats = {
    pending: 5,
    processing: 3,
    shipped: 8,
    delivered: 42,
    cancelled: 2,
    total: 60,
    conversion: 3.2, // percentage
  };

  const topProducts = [
    {
      id: "prod-1",
      name: "Sectional Garage Door",
      sales: 12,
      revenue: 7200.00,
      stock: 8,
    },
    {
      id: "prod-2",
      name: "Roller Garage Door",
      sales: 10,
      revenue: 5500.00,
      stock: 15,
    },
    {
      id: "prod-3",
      name: "Remote Control",
      sales: 25,
      revenue: 2250.00,
      stock: 30,
    },
    {
      id: "prod-4",
      name: "Smart Garage Door Opener",
      sales: 8,
      revenue: 3200.00,
      stock: 12,
    },
    {
      id: "prod-5",
      name: "Tilt Garage Door",
      sales: 6,
      revenue: 3000.00,
      stock: 5,
    },
  ];

  const topCategories = [
    {
      id: "cat-1",
      name: "Sectional Doors",
      sales: 18,
      revenue: 10800.00,
    },
    {
      id: "cat-2",
      name: "Roller Doors",
      sales: 15,
      revenue: 8250.00,
    },
    {
      id: "cat-3",
      name: "Door Openers",
      sales: 22,
      revenue: 6600.00,
    },
    {
      id: "cat-4",
      name: "Accessories",
      sales: 35,
      revenue: 3150.00,
    },
  ];

  // Monthly sales data for chart
  const monthlySales = [
    { month: "Jan", sales: 8500 },
    { month: "Feb", sales: 9200 },
    { month: "Mar", sales: 10500 },
    { month: "Apr", sales: 9800 },
    { month: "May", sales: 11200 },
    { month: "Jun", sales: 12500 },
    { month: "Jul", sales: 11800 },
    { month: "Aug", sales: 13200 },
    { month: "Sep", sales: 14500 },
    { month: "Oct", sales: 15800 },
    { month: "Nov", sales: 16500 },
    { month: "Dec", sales: 17200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Today's Sales
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(salesData.today)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    This Week
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(salesData.thisWeek)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    This Month
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(salesData.thisMonth)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Year to Date
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(salesData.thisYear)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Sales Trend</h2>
        </div>
        <div className="p-6">
          <div className="h-80 flex items-end space-x-2">
            {monthlySales.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ 
                    height: `${(data.sales / Math.max(...monthlySales.map(d => d.sales))) * 200}px` 
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Statistics */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Order Statistics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="text-sm text-gray-500">Pending</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold text-gray-900">{orderStats.pending}</div>
                  <div className="text-sm text-gray-500">orders</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <div className="text-sm text-gray-500">Processing</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold text-gray-900">{orderStats.processing}</div>
                  <div className="text-sm text-gray-500">orders</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <div className="text-sm text-gray-500">Shipped</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold text-gray-900">{orderStats.shipped}</div>
                  <div className="text-sm text-gray-500">orders</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <div className="text-sm text-gray-500">Delivered</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold text-gray-900">{orderStats.delivered}</div>
                  <div className="text-sm text-gray-500">orders</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-900">Total Orders</div>
                <div className="text-sm font-medium text-gray-900">{orderStats.total}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-900">Conversion Rate</div>
                <div className="text-sm font-medium text-gray-900">{orderStats.conversion}%</div>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/orders"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Top Categories</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">{formatCurrency(category.revenue)}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${(category.revenue / Math.max(...topCategories.map(c => c.revenue))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">{category.sales} sales</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((category.revenue / salesData.thisMonth) * 100)}% of total
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/admin/categories"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Top Selling Products</h2>
          <Link
            href="/admin/products"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            View All Products
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sales} units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${product.stock < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {product.stock} in stock
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/products/${product.id}`}
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
  );
}
