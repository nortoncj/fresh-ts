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
} from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Messages ",
        href: "/conversations",
        icon: HiMegaphone,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Edit Profile",
        href: "/profile",
        icon: HiUserCircle,
        active: pathname === "/profile",
      },
      {
        label: "Orders",
        href: "/orders",
        icon: HiClipboard,
        active: pathname === "/orders",
      },
      {
        label: "Analytics ",
        href: "/analytics",
        icon: HiChartPie,
        active: pathname === "/analytics",
      },
      {
        label: "Reports",
        href: "/reports",
        icon: HiTableCells,
        active: pathname === "/reports",
      },
      {
        label: "Membership",
        href: "/membership",
        icon: HiMiniUserPlus,
        active: pathname === "/membership",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: HiCog,
        active: pathname === "/settings",
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
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
