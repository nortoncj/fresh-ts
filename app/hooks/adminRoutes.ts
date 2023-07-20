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
import {MdManageAccounts} from "react-icons/md"
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useAdminRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Accounts",
        href: "/admin/profile",
        icon: MdManageAccounts,
        active: pathname === "/admin/accounts",
      },
      {
        label: "Edit Profile",
        href: "/user/profile",
        icon: HiUserCircle,
        active: pathname === "/user/profile",
      },
      {
        label: "Orders",
        href: "/orders",
        icon: HiClipboard,
        active: pathname === "/user/orders",
      },

      {
        label: "Membership",
        href: "/membership",
        icon: HiMiniUserPlus,
        active: pathname === "/user/membership",
      },
      {
        label: "Settings",
        href: "/settings",
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

export default useAdminRoutes;
