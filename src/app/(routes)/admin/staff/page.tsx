import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function StaffPage() {
  // In a real implementation, we would fetch staff members from the database
  // For now, we'll use placeholder data
  const staffMembers = [
    {
      id: "staff-1",
      name: "Steve Johnson",
      email: "steve@geelonggaragedoors.com.au",
      role: "Admin",
      permissions: ["all"],
      lastActive: new Date("2025-05-29"),
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "staff-2",
      name: "Sarah Williams",
      email: "sarah@geelonggaragedoors.com.au",
      role: "Manager",
      permissions: ["products", "orders", "customers"],
      lastActive: new Date("2025-05-28"),
      createdAt: new Date("2024-03-15"),
    },
    {
      id: "staff-3",
      name: "Michael Brown",
      email: "michael@geelonggaragedoors.com.au",
      role: "Sales",
      permissions: ["products", "orders"],
      lastActive: new Date("2025-05-25"),
      createdAt: new Date("2024-06-20"),
    },
    {
      id: "staff-4",
      name: "Emma Davis",
      email: "emma@geelonggaragedoors.com.au",
      role: "Support",
      permissions: ["orders", "customers"],
      lastActive: new Date("2025-05-27"),
      createdAt: new Date("2024-09-05"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Link
          href="/admin/staff/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Staff Member
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {staff.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${staff.role === "Admin" ? "bg-purple-100 text-purple-800" : 
                        staff.role === "Manager" ? "bg-blue-100 text-blue-800" : 
                        staff.role === "Sales" ? "bg-green-100 text-green-800" : 
                        "bg-yellow-100 text-yellow-800"}`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {staff.permissions.includes("all") 
                        ? "Full Access" 
                        : staff.permissions.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {staff.lastActive.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/staff/${staff.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/staff/${staff.id}/edit`}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Roles & Permissions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Admin</div>
                  <div className="text-xs text-gray-500">Full access to all areas</div>
                </div>
                <Link
                  href="/admin/staff/roles/admin"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Edit
                </Link>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Manager</div>
                  <div className="text-xs text-gray-500">Access to products, orders, customers</div>
                </div>
                <Link
                  href="/admin/staff/roles/manager"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Edit
                </Link>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Sales</div>
                  <div className="text-xs text-gray-500">Access to products and orders</div>
                </div>
                <Link
                  href="/admin/staff/roles/sales"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Edit
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-gray-900">Support</div>
                  <div className="text-xs text-gray-500">Access to orders and customers</div>
                </div>
                <Link
                  href="/admin/staff/roles/support"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/admin/staff/roles/new"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Create New Role
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Activity Log</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Steve Johnson
                  </p>
                  <p className="text-sm text-gray-500">
                    Updated product "Sectional Garage Door" price
                  </p>
                  <p className="text-xs text-gray-400">
                    Today at 2:30 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Sarah Williams
                  </p>
                  <p className="text-sm text-gray-500">
                    Created new category "Remote Controls"
                  </p>
                  <p className="text-xs text-gray-400">
                    Yesterday at 10:15 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Michael Brown
                  </p>
                  <p className="text-sm text-gray-500">
                    Processed order #GGD-10005
                  </p>
                  <p className="text-xs text-gray-400">
                    Yesterday at 9:30 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Emma Davis
                  </p>
                  <p className="text-sm text-gray-500">
                    Added note to customer "John Smith"
                  </p>
                  <p className="text-xs text-gray-400">
                    2 days ago at 3:45 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/admin/staff/activity"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View All Activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
