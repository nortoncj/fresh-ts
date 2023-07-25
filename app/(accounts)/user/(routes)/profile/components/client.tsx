"use client";
import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import SettingsModal from "@/components/sidebar/SettingsModal";

interface ProfileProps {
  user: User;
}

export const ProfileClient: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <SettingsModal
        currentUser={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <Heading
            title={`Profile`}
            description="View and edit the contents of your profile"
          />

          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>

              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    cardicus.com/
                  </span>
                  <span> {user?.username} </span>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Intro
              </label>
              <div className="mt-2"></div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                <span> {user?.bio} </span>
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div
                  className="cursor-pointer hover:opacity-75 transition"
                  onClick={() => setIsOpen(true)}
                >
                  <Avatar user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Share who you are and where you do business.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <span>{user?.name}</span>
                <small>{user?.proNouns}</small>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Position
              </label>
              <div className="mt-2">
                <span>{user?.title}</span>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <span>{user?.email}</span>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <span>{user?.address}</span>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-4">
                <span> {user?.phone} </span>
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Link
              </label>
              <div className="mt-2">
                <span> {user?.link1} </span>
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Link
              </label>
              <div className="mt-2">
                <span> {user?.link2} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          onClick={() => router.push(`/user/profile/${user.id}/edit`)}
          className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
