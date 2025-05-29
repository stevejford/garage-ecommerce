"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";

interface FileUploadProps {
  endpoint: "productImage" | "productManual";
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export function FileUpload({
  endpoint,
  value,
  onChange,
  maxFiles = 5,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              {endpoint === "productImage" ? (
                <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={url}
                    alt={`Uploaded file ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-md overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxFiles && (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const newUrls = res.map((file) => file.url);
            onChange([...value, ...newUrls]);
            setError(null);
          }}
          onUploadError={(error: Error) => {
            setError(error.message);
          }}
          className="ut-upload-icon:text-slate-400 ut-label:text-slate-600 border-2 border-dashed rounded-lg p-6"
        />
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
