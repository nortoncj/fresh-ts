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
import { MdManageAccounts } from "react-icons/md";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useAdminRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Accounts",
        href: "/admin/accounts",
        icon: MdManageAccounts,
        active: pathname === "/admin/accounts",
      },
      {
        label: "Profile",
        href: "/admin/profile",
        icon: HiUserCircle,
        active: pathname === "/admin/profile",
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: HiClipboard,
        active: pathname === "/admin/orders",
      },

      {
        label: "Membership",
        href: "/admin/membership",
        icon: HiMiniUserPlus,
        active: pathname === "/admin/membership",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: HiCog,
        active: pathname === "/admin/settings",
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
