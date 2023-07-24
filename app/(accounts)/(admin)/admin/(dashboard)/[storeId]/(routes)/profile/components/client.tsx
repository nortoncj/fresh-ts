"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProfileColumn, columns } from "./columns";

interface ProfileClientProps {
  data: ProfileColumn[];
}

export const ProfileClient: React.FC<ProfileClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Profile `} description="Manage your profile" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Profile" />
      <Separator />
      <ApiList entityName="user" entityIdName="userId" />
    </>
  );
};
