import React, { FC } from "react";
import getUserDetails from "@/app/actions/getUserDetails";

import "./components/freemium.css";

import Freemium from "./components/free";
import { Heading } from "@/components/ui/heading";
interface ProfilePageProps {
  params: { username: string };
}
const ProfilePage: FC<ProfilePageProps> = async ({ params }) => {
  const user = await getUserDetails(params.username);

  if (user) {
    return (
      <>
        {user.role === "Freemium" ? (
          <><Freemium params={params} /> </>
        ) : (
          <>
            
            <Freemium params={params} />
          </>
        )}
      </>
    );
  } else return (
    <> <Heading
    title="User not found!"
    description="Please enter a valid username"
  /></>
  )
};

export default ProfilePage;
