import React from "react";
import { db } from "@/lib/db";
import UploadForm from "@/components/admin/upload-form";

export default async function UploadsPage() {
  // Fetch all images from the database
  const images = await db.image.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch all manuals from the database
  const manuals = await db.manual.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media & Uploads</h1>
      </div>

      {/* Upload Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Upload New Files</h2>
        <UploadForm />
      </div>

      {/* Images Gallery */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Product Images ({images.length})</h2>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={image.url}
                    alt={`Product image for ${image.product?.name || "Unknown product"}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 truncate">
                  {image.product?.name || "No product"}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No images uploaded yet.
          </div>
        )}
      </div>

      {/* Manuals List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Product Manuals ({manuals.length})</h2>
        
        {manuals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manuals.map((manual) => (
                  <tr key={manual.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <a 
                          href={manual.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {manual.name}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{manual.product?.name || "No product"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(manual.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No manuals uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
