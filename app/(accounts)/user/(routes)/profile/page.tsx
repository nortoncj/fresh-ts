

import { HiUserCircle, HiPhoto } from "react-icons/hi2";
import { ProfileClient } from "./components/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function ProfileView() {
    const data = await getCurrentUser()

    if(!data) {
        redirect('/login')
    } else {
  return (<div className="py-24 px-80">
          <ProfileClient user={data} />
    </div>
  );}
}
