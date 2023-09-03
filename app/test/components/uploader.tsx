'use client'
import React, { useCallback } from 'react';
import Dropzone, {FileRejection} from 'react-dropzone';
import { S3 } from 'aws-sdk';

const S3Uploader: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      uploadToS3(file);
    }
  }, []);

  const uploadToS3 = async (file: File) => {
    const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY as string,
  secretAccessKey: process.env.SECRET_KEY as string,
  region: process.env.REGION as string,
  signatureVersion: "v4",
});

    const params: S3.PutObjectRequest = {
      Bucket: 'cardicus-url', // Replace with your S3 bucket name
      Key: file.name,
      Body: file,
      ACL: 'public-read', // Set appropriate permissions
    };

    try {
      await s3.putObject(params).promise();
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
          <input {...getInputProps()} />
          <p>Drag and drop an image here, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
};

export default S3Uploader;
