import Sidebar from "@/components/sidebar/Sidebar";
import UserNavbar from "@/components/usernav/userNavbar";
import Image from "next/image";
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardicus | Portal",
  description: "Business Cards",

}

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect("/login");
  }

  return (
    <>
      <UserNavbar />
      <div className="items-center place-content-center justify-center">
        <Image
          height="200"
          alt="logo"
          width="200"
          className=" mt-6 mx-12 fixed z-40  xl:px-6 overflow-y-auto pb-4 flex flex-col "
          src="/images/words_camel.png"
        />
      </div>

      <div className="h-full ">{children}</div>
    </>
  );
}
