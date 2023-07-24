"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProfileColumn = {
  id: string;
  name: string | null;
  username: string | null;
  proNouns: string | null;
  title: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  link1: string | null;
  link2: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedIn: string | null;
  tikTok: string | null;
  youTube: string | null;
  twitch: string | null;
};

export const columns: ColumnDef<ProfileColumn>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "proNouns",
    header: "Pronouns",
  },
  {
    accessorKey: "title",
    header: "Position",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
