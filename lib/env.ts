import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  AZURE_AD_CLIENT_ID: zod.string().nonempty(),
  AZURE_AD_CLIENT_SECRET: zod.string().nonempty(),
  AZURE_AD_TENANT_ID: zod.string().nonempty(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: zod.string().nonempty(),
  NEXT_PUBLIC_API_URL: zod.string().nonempty(),
  STRIPE_API_KEY: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
