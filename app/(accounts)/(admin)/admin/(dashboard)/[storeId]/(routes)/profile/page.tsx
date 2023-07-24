import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProfileClient } from "./components/client";
import { ProfileColumn } from "./components/columns";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ProfilePage = async ({ params }: { params: { storeId: string } }) => {
  
  const user = await getCurrentUser();

  if(user !== null && user !== undefined) {
    const formattedProfile: ProfileColumn = {
      id: user.id,
      name: user.name,
      username: user.username,
      proNouns: user.proNouns,
      title: user.title,
      bio: user.bio,
      email: user.email,
      phone: user.phone,
      address: user.address,
      link1: user.link1,
      link2: user.link2,
      facebook: user.fb,
      twitter: user.tw,
      instagram: user.ig,
      linkedIn: user.li,
      tikTok: user.tt,
      youTube: user.yt,
      twitch: user.twt,
    };

  
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileClient data={[formattedProfile]} />
      </div>
    </div>
  );
  }
}

export default ProfilePage;
  
