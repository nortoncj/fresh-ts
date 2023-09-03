import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("customerImage") as unknown as File;
  const containerName = "imageanalysis";
  const storageConnectionString = process.env
    .AZURE_STORAGE_CONNECTION_STRING as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const bufferName = Date.now() +'_' + uuid();

  //With the file data in the buffer, you can do whatever you want with it
  // Write to file in new location

  console.log("Azure Blob storage v12 - JavaScript quickstart sample");

  // Quick start code goes here
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  if (!accountName) throw Error("Azure Storage accountName not found");

  //Login
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    storageConnectionString
  );

  //Create Container Client
  const containerClient: ContainerClient =
    blobServiceClient.getContainerClient(containerName);

  uploadBlobFromBuffer(containerClient, bufferName, buffer);

  return NextResponse.json({ success: true });
}

async function uploadBlobFromBuffer(
  containerClient: ContainerClient,
  blobName: string,
  buffer: Buffer
): Promise<void> {
  // Create blob client from container client
  const blockBlobClient: BlockBlobClient =
    containerClient.getBlockBlobClient(blobName);

  // Upload buffer
  await blockBlobClient.uploadData(buffer);
}
