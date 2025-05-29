"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  initialData: {
    storeName: string;
    storeEmail: string;
    storePhone: string;
    storeAddress: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    shippingNote: string;
    returnPolicy: string;
    enableReviews: boolean;
    enableGuestCheckout: boolean;
  };
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, we would save the settings to the database
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Refresh the page to show the updated settings
      router.refresh();
      
      // Show success message
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700">
              Store Email
            </label>
            <input
              type="email"
              id="storeEmail"
              name="storeEmail"
              value={formData.storeEmail}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700">
              Store Phone
            </label>
            <input
              type="text"
              id="storePhone"
              name="storePhone"
              value={formData.storePhone}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700">
              Store Address
            </label>
            <input
              type="text"
              id="storeAddress"
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
              Logo URL
            </label>
            <input
              type="text"
              id="logoUrl"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="h-8 w-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={handleChange}
                name="primaryColor"
                className="ml-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
              Secondary Color
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
                className="h-8 w-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={handleChange}
                name="secondaryColor"
                className="ml-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Store Policies</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="shippingNote" className="block text-sm font-medium text-gray-700">
              Shipping Note
            </label>
            <textarea
              id="shippingNote"
              name="shippingNote"
              rows={2}
              value={formData.shippingNote}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700">
              Return Policy
            </label>
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              rows={3}
              value={formData.returnPolicy}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Store Features</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="enableReviews"
              name="enableReviews"
              type="checkbox"
              checked={formData.enableReviews}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enableReviews" className="ml-2 block text-sm text-gray-700">
              Enable product reviews
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="enableGuestCheckout"
              name="enableGuestCheckout"
              type="checkbox"
              checked={formData.enableGuestCheckout}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enableGuestCheckout" className="ml-2 block text-sm text-gray-700">
              Enable guest checkout
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setFormData(initialData)}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
