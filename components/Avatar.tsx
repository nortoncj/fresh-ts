"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-12 md:w-12 ">
        <Image
          alt="Avatar"
          src={user?.image || "/images/default.png"}
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
