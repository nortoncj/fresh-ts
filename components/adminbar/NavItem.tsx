"use client";

import clsx from "clsx";
import Link from "next/link";

interface NavItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link onClick={handleClick} href={href}>
      <Icon className="h-6 w-6 shrink-0" />
      <h3 className="">{label}</h3>
    </Link>
  );
};

export default NavItem;
