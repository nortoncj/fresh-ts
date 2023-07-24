import prismadb from "@/lib/prismadb";

import { ProfileForm } from "../components/profile-form";

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const profile = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
