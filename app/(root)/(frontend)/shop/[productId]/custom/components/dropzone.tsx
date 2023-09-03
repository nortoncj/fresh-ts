"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { NextPage } from "next";

function Dropzone() {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedfile, setSelectedFile] = useState<File | undefined>();
  const [file, setFile] = useState<File | undefined>();

  return (
    <div {...getRootProps()}>
      <input
        {...getInputProps()}
        
      />
      <button
        className="w-40 mx-auto aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer"
        type="button"
        onClick={open}
      >
        Select Image
      </button>
    </div>
  );
}

export default Dropzone;
