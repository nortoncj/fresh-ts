
const {BlobServiceClient} = require('@azure/storage-blob');
const multipart = require("parse-multipart");
const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"];
module.exports = async function (context, req) {
    context.log('HTTP function processed a request.');
    var bodyBuffer = Buffer.from(req.body);
    // get boundary for multipart data e.g. ----WebKitFormBoundaryDtbT5UpPj83kllfw
    var boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    var parts = multipart.Parse(bodyBuffer, boundary);
    //Create the BlobService Client object which will be used to create the container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    //Get a reference to a container
    const container = "custom"
    const containerClient = await blobServiceClient.getContainerClient(container);
    // Create a unique name for the blob
     const blobName = parts[0].filename;
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(parts[0].data, parts[0].data.length);
    context.res.headers= {
        "Content-Type": 'application/json'
    }
    context.res.body = '{name : blobname, type:parts[0].type, data: parts[0].data.length}';
    context.done();
    /* context.res = {
        body: AZURE_STORAGE_CONNECTION_STRING
    }*/
};