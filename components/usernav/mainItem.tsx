"use client";
import React from "react";

import Link from "next/link";
import clsx from "clsx";

interface MainItemProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const MainItem: React.FC<MainItemProps> = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      key={href}
      href={href}
      className={clsx(
        "text-sm font-medium transition-colors hover:text-primary",
        active ? "text-black dark:text-white" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );
};

export default MainItem;
