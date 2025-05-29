import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  // Sample dashboard data
  const dashboardData = {
    totalProducts: 156,
    totalOrders: 42,
    lowStockItems: 8,
    recentOrders: [
      { id: "ORD-001", customer: "John Smith", date: "2025-05-21", status: "Pending", total: 149.97 },
      { id: "ORD-002", customer: "Sarah Johnson", date: "2025-05-20", status: "Processing", total: 89.99 },
      { id: "ORD-003", customer: "Michael Brown", date: "2025-05-19", status: "Shipped", total: 224.95 },
      { id: "ORD-004", customer: "Emma Wilson", date: "2025-05-18", status: "Delivered", total: 74.98 },
    ],
    recentProducts: [
      { id: "PRD-001", name: "B&D Remote Control", sku: "BD-RC-001", added: "2025-05-20", stock: 15 },
      { id: "PRD-002", name: "Steel-Line Track Roller", sku: "SL-TR-002", added: "2025-05-19", stock: 32 },
      { id: "PRD-003", name: "Centurion Safety Beam", sku: "CN-SB-003", added: "2025-05-18", stock: 7 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Geelong Garage Doors admin panel.</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{dashboardData.totalProducts}</p>
          <Link href="/admin/products" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            View all products
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{dashboardData.totalOrders}</p>
          <Link href="/admin/orders" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            View all orders
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Low Stock Items</h3>
          <p className="text-3xl font-bold text-amber-500">{dashboardData.lowStockItems}</p>
          <Link href="/admin/products?filter=low-stock" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            View low stock items
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Upload Queue</h3>
          <p className="text-3xl font-bold">0</p>
          <Link href="/admin/uploads" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            Manage uploads
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      View
                    </Link>
                    <Link href={`/admin/orders/${order.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently Added Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recently Added Products</h2>
          <Link href="/admin/products" className="text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.added}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      View
                    </Link>
                    <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products/new">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-center">
            <h3 className="text-xl font-bold mb-2">Add New Product</h3>
            <p className="text-blue-100">Create a new product listing</p>
          </div>
        </Link>
        <Link href="/admin/brands/new">
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-sm hover:bg-purple-700 transition-colors text-center">
            <h3 className="text-xl font-bold mb-2">Manage Brands</h3>
            <p className="text-purple-100">Add or edit brand information</p>
          </div>
        </Link>
        <Link href="/admin/categories/new">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-sm hover:bg-green-700 transition-colors text-center">
            <h3 className="text-xl font-bold mb-2">Manage Categories</h3>
            <p className="text-green-100">Organize your product taxonomy</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
