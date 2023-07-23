import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AccountColumn } from "./components/columns";
import { AccountClient } from "./components/client";

const Accounts = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const accounts= await prismadb?.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
// @ts-expect-error
  const formattedAccounts: AccountColumn[] = accounts.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return ( <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6 ">
      <AccountClient data={formattedAccounts} />
    </div>
  </div> )
};

export default Accounts;
