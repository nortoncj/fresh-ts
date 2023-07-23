import prismadb from "@/lib/prismadb";

import { AccountForm } from "./components/account-form";
import { undefined } from "zod";

const AccountPage = async ({ params }: { params: { userId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AccountForm initialData={null} />
      </div>
    </div>
  );
};

export default AccountPage;
