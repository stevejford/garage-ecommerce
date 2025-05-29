"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";

export default function UploadForm() {
  const [uploadType, setUploadType] = useState<"image" | "manual">("image");
  const [productId, setProductId] = useState<string>("");
  const [manualName, setManualName] = useState<string>("");
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={() => setUploadType("image")}
          className={`px-4 py-2 rounded-md ${
            uploadType === "image"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Upload Images
        </button>
        <button
          type="button"
          onClick={() => setUploadType("manual")}
          className={`px-4 py-2 rounded-md ${
            uploadType === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Upload Manuals
        </button>
      </div>

      {uploadType === "manual" && (
        <div className="mb-4">
          <label htmlFor="manualName" className="block text-sm font-medium text-gray-700">
            Manual Name
          </label>
          <input
            type="text"
            id="manualName"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g. Installation Guide"
            required
          />
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
          Product (Optional)
        </label>
        <select
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select a product</option>
          {/* This would be populated with products from the database */}
          <option value="product-1">Sample Product 1</option>
          <option value="product-2">Sample Product 2</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          {uploadType === "image" 
            ? "If selected, this image will be associated with the product."
            : "If selected, this manual will be associated with the product."}
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <UploadDropzone
          endpoint={uploadType === "image" ? "productImage" : "productManual"}
          onClientUploadComplete={(res) => {
            // Handle the response from the upload
            console.log("Files: ", res);
            alert("Upload completed successfully!");
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            // Handle any errors
            alert(`ERROR! ${error.message}`);
          }}
          config={{
            mode: "auto",
          }}
        />
      </div>
    </div>
  );
}
