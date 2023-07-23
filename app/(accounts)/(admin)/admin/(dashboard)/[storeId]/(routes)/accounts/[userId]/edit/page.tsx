import prismadb from "@/lib/prismadb";

import { AccountForm } from "../components/account-form";

const AccountPage = async ({
  params
}: {
  params: { userId: string }
}) => {
  const account = await prismadb.user.findUnique({
    where: {
      id: params.userId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AccountForm initialData={account} />
      </div>
    </div>
  );
}

export default AccountPage;