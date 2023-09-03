"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

const Test: React.FC = () => {
  const AZURE_FUNCTION_URL = process.env.AZURE_API_URL as string;
  const [file, setFile] = useState<File | null>(null);
  const [newFileName, setnewFileName] = useState<string>(""); //initialize filename as string

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setnewFileName(`${uuidv4()}_${selectedFile.name}`);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file, newFileName);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        await axios.post(
          "https://devcard.azurewebsites.net/api/UploadImage",
          formData,
          config
        );

        console.log("Upload Successful");
      } catch (error: any) {
        console.log("Upload failed", error.response.data);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload}>Upload </Button>
    </div>
  );
};

export default Test;
