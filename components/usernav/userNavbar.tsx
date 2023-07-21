import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { MainNav } from "./main-nav";

const UserNavbar = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
    </div>
  );
};

export default UserNavbar;
