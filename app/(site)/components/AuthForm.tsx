"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import clsx from "clsx";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant == "REGISTER") {
      // Axios Register
    }

    if (variant == "LOGIN") {
      // NEXT AUTH SIGN IN
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NEXT AUTH SIGN IN SOCIAL
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rouded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant == "REGISTER" && (
            <div className="flex gap-4">
              <Input
                id="firstName"
                label="First Name"
                register={register}
                errors={errors}
              />
              <Input
                id="lastName"
                label="Last Name"
                register={register}
                errors={errors}
              />
            </div>
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div className="">
            <Button disabled={isLoading} fullwidth type="submit">
              {" "}
              {variant == "LOGIN" ? "Login" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
          <hr className=" text-gray-500" />
          <p className="text-center text-sm">or continue with</p>
          <hr className=" text-gray-500" />
        </div>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={FcGoogle}
            onClick={() => socialAction("google")}
          />
          <AuthSocialButton
            icon={BsMicrosoft}
            onClick={() => socialAction("microsoft")}
          />
        </div>
        <div className="flex gap-2 justify-center text=sm mt-6 text-gray-500">
          <div className="">
            {variant == "LOGIN"
              ? "New to Cardicus?"
              : "Already have an account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant == "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
