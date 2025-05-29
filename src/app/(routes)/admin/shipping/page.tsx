import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function ShippingPage() {
  // In a real implementation, we would fetch shipping zones and rates from the database
  // For now, we'll use placeholder data
  const shippingZones = [
    {
      id: "zone-1",
      name: "Geelong Metro",
      postcodeRange: "3200-3220",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "zone-2",
      name: "Melbourne Metro",
      postcodeRange: "3000-3207",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "zone-3",
      name: "Regional Victoria",
      postcodeRange: "3221-3999",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "zone-4",
      name: "Interstate",
      postcodeRange: "1000-2999, 4000-9999",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const shippingRates = [
    {
      id: "rate-1",
      zoneId: "zone-1",
      zoneName: "Geelong Metro",
      minWeight: 0,
      maxWeight: 5,
      cost: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "rate-2",
      zoneId: "zone-1",
      zoneName: "Geelong Metro",
      minWeight: 5.01,
      maxWeight: 20,
      cost: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "rate-3",
      zoneId: "zone-2",
      zoneName: "Melbourne Metro",
      minWeight: 0,
      maxWeight: 5,
      cost: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "rate-4",
      zoneId: "zone-2",
      zoneName: "Melbourne Metro",
      minWeight: 5.01,
      maxWeight: 20,
      cost: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "rate-5",
      zoneId: "zone-3",
      zoneName: "Regional Victoria",
      minWeight: 0,
      maxWeight: 5,
      cost: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "rate-6",
      zoneId: "zone-4",
      zoneName: "Interstate",
      minWeight: 0,
      maxWeight: 5,
      cost: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shipping Management</h1>
      </div>

      {/* Shipping Zones */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Shipping Zones</h2>
          <Link 
            href="/admin/shipping/zones/new" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Zone
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Postcode Range
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shippingZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{zone.postcodeRange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {zone.createdAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/shipping/zones/${zone.id}`}
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

      {/* Shipping Rates */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Shipping Rates</h2>
          <Link 
            href="/admin/shipping/rates/new" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Rate
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight Range (kg)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shippingRates.map((rate) => (
                <tr key={rate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rate.zoneName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {rate.minWeight} - {rate.maxWeight} kg
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${rate.cost.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/shipping/rates/${rate.id}`}
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

      {/* Shipping Calculator */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Shipping Calculator</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 mb-4">
            Use this calculator to test shipping rates for different postcodes and weights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g. 3220"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                step="0.01"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g. 2.5"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
