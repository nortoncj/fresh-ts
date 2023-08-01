import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect } from "next/navigation";
import React from "react";
import { IoSearch } from "react-icons/io5";

export default async function SearchBar() {
  async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
      redirect("/search?query=" + searchQuery);
    }
  }
  return (
    <li className="nav-item nav-link nav-login  nav-search">
      <form action={searchProducts}>
        <Popover>
          <PopoverTrigger>
            <IoSearch className="w-6" />
          </PopoverTrigger>
          <PopoverContent>
            <Input name="searchQuery" placeholder="Search" />
          </PopoverContent>
        </Popover>
      </form>
    </li>
  );
}
