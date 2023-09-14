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
        label: "Legion",
        href: "/user/legion",
        icon: HiMiniUserPlus,
        active: pathname === "/user/legion",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
