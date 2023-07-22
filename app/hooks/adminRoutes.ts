import { usePathname, useParams } from "next/navigation";
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
  HiArchiveBox,
} from "react-icons/hi2";
import { FaLayerGroup } from "react-icons/fa";
import {
  MdInvertColors,
  MdManageAccounts,
  MdPhotoSizeSelectLarge,
} from "react-icons/md";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useAdminRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const params = useParams();

  const routes = useMemo(
    () => [
      {
        label: "Accounts",
        href: `/admin/${params.storeId}/accounts`,
        icon: MdManageAccounts,
        active: pathname === `/admin/${params.storeId}/accounts`,
      },
      {
        label: "Profile",
        href: `/admin/${params.storeId}/profile`,
        icon: HiUserCircle,
        active: pathname === `/admin/${params.storeId}/profile`,
      },
      {
        label: "Orders",
        href: `/admin/${params.storeId}/orders`,
        icon: HiClipboard,
        active: pathname === `/admin/${params.storeId}/orders`,
      },
      {
        label: "Products",
        href: `/admin/${params.storeId}/products`,
        icon: HiArchiveBox,
        active: pathname === `/admin/${params.storeId}/products`,
      },
      {
        label: "Categories",
        href: `/admin/${params.storeId}/categories`,
        icon: FaLayerGroup,
        active: pathname === `/admin/${params.storeId}/categories`,
      },
      {
        label: "Colors",
        href: `/admin/${params.storeId}/colors`,
        icon: MdInvertColors,
        active: pathname === `/admin/${params.storeId}/colors`,
      },
      {
        label: "Sizes",
        href: `/admin/${params.storeId}/sizes`,
        icon: MdPhotoSizeSelectLarge,
        active: pathname === `/admin/${params.storeId}/sizes`,
      },

      {
        label: "Membership",
        href: `/admin/${params.storeId}/membership`,
        icon: HiMiniUserPlus,
        active: pathname === `/admin/${params.storeId}/membership`,
      },
      {
        label: "Announcements",
        href: `/admin/${params.storeId}/announcements`,
        icon: HiMegaphone,
        active: pathname === `/admin/${params.storeId}/announcements`,
      },
      {
        label: "Settings",
        href: `/admin/${params.storeId}/settings`,
        icon: HiCog,
        active: pathname === `/admin/${params.storeId}/settings`,
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
