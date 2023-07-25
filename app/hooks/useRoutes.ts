import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  HiUsers,
  HiArrowLeftOnRectangle,
  HiMegaphone,
  HiCog,
  HiUserCircle,
  HiClipboard,
  HiChartPie,
  HiTableCells,
  HiMiniUserPlus,
  HiHome,
} from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Overview",
        href: "/user",
        icon: HiHome,
        active: pathname === "/user",
      },
      {
        label: "Profile",
        href: "/user/profile",
        icon: HiUserCircle,
        active: pathname === "/user/profile",
      },

      {
        label: "Illuminati",
        href: "/user/illuminati",
        icon: HiMiniUserPlus,
        active: pathname === "/user/illuminati",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
