"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import "./components/styles.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, {
  useState,
  useCallback,
  useTransition,
  ChangeEvent,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { NextPage } from "next";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import axios from "axios";
import AddToCartButton from "../components/addToCartButton";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomizeButton from "./components/uploadButton";
import { incrementCustomProductQuantity } from "./actions";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
// FORM FUNCTIONS
const formSchema = z.object({
  customImage: z.string().min(2),
  branded: z.boolean().default(true),
});
type CustomFormValues = z.infer<typeof formSchema>;

interface CustomProps {
  params: {
    productId: string;
  };
}

const CustomizeOrder: React.FC<CustomProps> = ({ params }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedfile, setSelectedFile] = useState<File>();
  const [file, setFile] = useState<File | undefined>();
  const [newFileName, setnewFileName] = useState<string>(""); //initialize filename as string
  const [state, setState] = useState("ready");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const productId = params.productId;
  const branded = false;
  const router = useRouter();
  const form = useForm<CustomFormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
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
        console.log("customImage", URL.createObjectURL(file));
        router.push("/cart");
      } catch (error: any) {
        console.log("Upload failed", error.response.data);
      }
    }
    setState("sent");
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setnewFileName(`${uuidv4()}_${selectedFile.name}`);
    }
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = target.files?.[0];
    //display selected
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
    //set for upload
    setFile(file);
  };
  return (
    <div className=" ">
      <Form {...form}>
        <form onSubmit={handleOnSubmit} method="POST">
          <div className="grid  w-full max-w-sm items-center gap-1.5 mt-32 mx-auto">
            <FormField
              control={form.control}
              name="customImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {uploading ? "Uploading.." : "Upload Design"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      hidden
                      name="image"
                      className="cursor-pointer"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <small className="text-gray-300">
                    Copyrighted images are prohibited from being used without
                    authorization
                  </small>
                </FormItem>
              )}
            />
            {selectedImage ? (
              <>
                <div className="w-40 text-extrabold mx-auto cursor-pointer">
                  <div className="text-extrabold text-xl">Image</div>
                  <div className="">
                    <div className=" w-40 mb-2  aspect-video border-dashed rounded flex items-center justify-center border-2  cursor-pointer">
                      <img src={selectedImage} alt="" />
                    </div>
                    <div className=" w-40 mb-2 bg-slate-900  aspect-video border-dashed rounded flex items-center justify-center border-2  cursor-pointer">
                      <img src={selectedImage} alt="" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className=" flex mx-80 mb-2 justify-end ">
            <CustomizeButton
              incrementCustomProductQuantity={incrementCustomProductQuantity}
              productId={productId}
              customImage={newFileName}
              branded={false}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CustomizeOrder;
