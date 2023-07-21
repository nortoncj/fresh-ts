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
        label: 'Overview',
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
        label: "Orders",
        href: "/user/orders",
        icon: HiClipboard,
        active: pathname === "/user/orders",
      },

      {
        label: "Membership",
        href: "/user/membership",
        icon: HiMiniUserPlus,
        active: pathname === "/user/membership",
      },
      {
        label: "Settings",
        href: "/user/settings",
        icon: HiCog,
        active: pathname === "/user/settings",
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
