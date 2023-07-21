import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <Sidebar>
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
    </Sidebar>
  );
}
