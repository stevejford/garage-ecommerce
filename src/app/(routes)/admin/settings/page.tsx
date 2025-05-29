import React from "react";
import { db } from "@/lib/db";
import SettingsForm from "@/components/admin/settings-form";

export default async function SettingsPage() {
  // In a real implementation, we would fetch the store settings from the database
  // For now, we'll use placeholder data
  const settings = {
    storeName: "Geelong Garage Doors",
    storeEmail: "sales@geelonggaragedoors.com.au",
    storePhone: "(03) 5222 1234",
    storeAddress: "123 Main Street, Geelong VIC 3220",
    logoUrl: "/logo.png",
    primaryColor: "#0066cc",
    secondaryColor: "#f0f0f0",
    shippingNote: "Free shipping on orders over $100",
    returnPolicy: "30-day returns on all products",
    enableReviews: true,
    enableGuestCheckout: true,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Store Settings</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <SettingsForm initialData={settings} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Management</h2>
          <p className="text-gray-500 mb-4">
            Manage staff accounts and permissions for your store.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Staff
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <p className="text-gray-500 mb-4">
            Configure payment methods for your store.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Configure Payments
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Zones</h2>
          <p className="text-gray-500 mb-4">
            Configure shipping zones and rates for your store.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Shipping
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Database Backup</h2>
          <p className="text-gray-500 mb-4">
            Create and download a backup of your store data.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Backup
          </button>
        </div>
      </div>
    </div>
  );
}
