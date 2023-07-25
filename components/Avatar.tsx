"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-12 w-12 md:h-12 md:w-12 lg:w-24 lg:h-24">
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
