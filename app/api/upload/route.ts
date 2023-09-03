import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const AZURE_FUNCTION_URL = process.env.AZURE_API_URL as string; // Replace with your Azure Function URL
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const response = await axios.put(AZURE_FUNCTION_URL, req.body);

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json({ error: "Failed to upload image" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
}
