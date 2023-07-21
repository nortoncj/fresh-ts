"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import useRoutes from "@/app/hooks/useRoutes";

import { cn } from "@/lib/utils";
import MainItem from "./mainItem";

interface MainNavProps {
  className: string;
  icon: any;
  href: string;
  onClick?: () => void;
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const routes = useRoutes();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <MainItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </nav>
  );
}
