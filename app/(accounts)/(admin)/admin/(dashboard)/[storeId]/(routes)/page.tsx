import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";

interface AdminHomeProps {
  params: { storeId: string };
}

const AdminHome: React.FC<AdminHomeProps> = async ({ params }) => {
  const user = await getCurrentUser();
  const userId = user?.id

  if(!userId) {
    redirect('/login');
  }

  const stores = await prismadb?.store?.findMany({
    where: {
      userId,
    },
  });

  return (
    <div>
      <h1>Admin Home</h1>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <StoreSwitcher items={stores} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
