"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthing";

interface CustomUploaderProps {
  endpoint: "productImage" | "productManual";
  value: string[];
  onValueChange: (urls: string[]) => void;
  maxFiles?: number;
}

// Define this type to make TypeScript happy with the serializable props
type SerializableProps = {
  value: string[];
  onValueChange: (urls: string[]) => void;
}

export function CustomUploader({
  endpoint,
  value,
  onValueChange,
  maxFiles = 5,
}: CustomUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { startUpload, routeConfig } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((file) => file.url);
      onValueChange([...value, ...newUrls]);
      setFiles([]);
      setIsUploading(false);
      setError(null);
    },
    onUploadError: (err: Error) => {
      setError(err.message);
      setIsUploading(false);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter out files that would exceed the max file count
      const remainingSlots = maxFiles - value.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      
      if (filesToAdd.length < acceptedFiles.length) {
        setError(`Only ${remainingSlots} more file(s) can be uploaded`);
      } else {
        setError(null);
      }
      
      setFiles(filesToAdd);
    },
    [maxFiles, value.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
    maxFiles: maxFiles - value.length,
    disabled: isUploading || value.length >= maxFiles,
  });

  const handleRemove = (urlToRemove: string) => {
    onValueChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Display existing files */}
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

      {/* Dropzone for new files */}
      {value.length < maxFiles && (
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : isUploading
                ? "border-gray-400 bg-gray-50 cursor-not-allowed"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-gray-700">
                {isUploading ? (
                  <div className="text-sm">Uploading files...</div>
                ) : (
                  <div>
                    <p className="font-medium">
                      Drag & drop {endpoint === "productImage" ? "images" : "PDF files"} here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to select {endpoint === "productImage" ? "images" : "files"}
                    </p>
                    {endpoint === "productImage" ? (
                      <p className="text-xs text-gray-400 mt-1">
                        Supports: JPG, PNG, WEBP (max 4MB each)
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">
                        Supports: PDF (max 16MB each)
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Files selected but not yet uploaded */}
          {files.length > 0 && !isUploading && (
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
              <span className="text-sm text-gray-600">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </span>
              <button
                type="button"
                onClick={() => {
                  startUpload(files);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
