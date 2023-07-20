"use client";

import { useStoreModal } from "@/app/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
    </Modal>
  );
};
