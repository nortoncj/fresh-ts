const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateAccountSASQueryParameters,
} = require("@azure/storage-blob");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME; //account name
const accountKey = process.env.AZURE_STORAGE_KEY;
const containerName = "imageanalysis";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const BlobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

async function generateSASToken() {
  const containerClient = BlobServiceClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.write = true;
  permissions.create = true;
  permissions.read = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions.toString(),
      expiresON: expiryDate,
    },
    sharedKeyCredential
  ).toString();
  return sasToken;
}

module.exports = generateSASToken;
