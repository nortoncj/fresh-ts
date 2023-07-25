import prismadb from "@/lib/prismadb";

import { ProfileForm } from "../components/profile-form";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ProfilePage = async ({ currentUser }: { currentUser: { userId: string } }) => {
  const user = await getCurrentUser();
  const profile = await prismadb.user.findUnique({
    where: {
      id: user?.id,
    },
  });


  return (
    <div className=" px-80 py-12 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
