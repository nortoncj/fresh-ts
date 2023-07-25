import prismadb from "@/lib/prismadb";

import { ProfileForm } from "./components/profile-form";

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  return (
    <div className="flex-col px-40 py-12">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileForm initialData={null} />
      </div>
    </div>
  );
};

export default ProfilePage;
