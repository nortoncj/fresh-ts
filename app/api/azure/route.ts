import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const router = await useRouter();
  const api = process.env.AZURE_API_URL as string;
  const formData = new FormData();
  formData.append("image", req.body);

  try {
    const axiosResponse = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (axiosResponse.status === 200) {
      res.status(200).json({ message: "Image uploaded successfully" });
      router.push("/cart");
    } else {
      res.status(500).json({ error: "Failed to upload image" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
}
