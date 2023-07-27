"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { Color, Size } from "@/types";

import { ProductFilter } from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilter: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="justify-end flex-auto px-1 py-1">
        <Button onClick={onOpen} className="flex w-24 px-2 gap-x-2 lg:hidden">
          Filters
          <Plus size={20} />
        </Button>
      </div>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full  max-w-xs flex-col overflow-y-auto to-[#c19a6b] from-[#f5e8da] bg-gradient-to-bl py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center shadow-none border-none justify-end px-4">
              <IconButton
                className="bg-transparent shadow-none border-none all:unset"
                icon={<X size={15} />}
                onClick={onClose}
              />
            </div>

            <div className="p-4 ">
              <ProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
              <ProductFilter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilter;
