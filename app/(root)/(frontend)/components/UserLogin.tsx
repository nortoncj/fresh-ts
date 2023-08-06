"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { Cinzel } from "next/font/google";

interface UserMenuButtonProps {
  session: Session | null;
}

const cinzel = Cinzel({ subsets: ["latin"] });

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  return (
    <li className="nav-item nav-link nav-login nav-main">
      {user ? (
        <Link className="nav-nav-link_link" href="/user" style={cinzel.style}>
          Account
        </Link>
      ) : (
        <Link className="nav-nav-link_link" href="/login" style={cinzel.style}>
          Login
        </Link>
      )}
    </li>
  );
}
