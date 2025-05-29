"use client";

import { useState } from "react";
import { UploadButton as UTUploadButton } from "@/utils/uploadthing";

interface UploadButtonProps {
  endpoint: "productImage" | "productManual";
  onClientUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
}

export function UploadButton({
  endpoint,
  onClientUploadComplete,
  maxFiles = 1,
}: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="w-full">
      <UTUploadButton
        endpoint={endpoint}
        onUploadProgress={() => setIsUploading(true)}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (onClientUploadComplete) {
            const urls = res.map((file) => file.url);
            onClientUploadComplete(urls);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          console.error("Error uploading file:", error);
        }}
        className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white"
      />
      {isUploading && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Uploading files...
        </div>
      )}
    </div>
  );
}
