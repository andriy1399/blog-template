"use client";
import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import axios from "axios";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
interface CoverImageUploadProps {
  onUploadComplete: (url: string) => void;
}
const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
  onUploadComplete,
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUploadComplete = (files: any[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedUrl(file.url);
      setUploading(false);
      onUploadComplete(file.url);
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload failed:", error);
    setUploading(false);
  };

  const deleteImage = async () => {
    if (!uploadedUrl) return;

    try {
      const response = await axios.delete("/api/uploadthing", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { url: uploadedUrl },
      });

      if (response.status === 200) {
        setUploadedUrl(null);
        onUploadComplete("");
      } else {
        throw new Error(response.data.error || "Failed to delete image");
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="mb-6">
      {!uploadedUrl ? (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
            uploading ? "border-blue-500" : "border-gray-300"
          }`}
          config={{
            mode: "auto",
          }}
          content={{
            button: "Upload Cover",
          }}
        />
      ) : (
        <div className="relative">
          <img
            src={uploadedUrl}
            alt="Cover Preview"
            className="w-full h-64 object-cover rounded-md"
          />
          <Button
            onClick={deleteImage}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
          >
            <Cross1Icon className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoverImageUpload;
