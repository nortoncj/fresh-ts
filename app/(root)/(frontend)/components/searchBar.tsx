import { Button } from "@/components/ui/button";
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
      <Popover>
        <PopoverTrigger>
          <IoSearch className="w-6" />
        </PopoverTrigger>
        <PopoverContent>
          <form action={searchProducts}>
            <div className="flex gap-2 form-control">
              <Input
                className="border-none active:border-none"
                name="searchQuery"
                placeholder="Search"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </li>
  );
}
