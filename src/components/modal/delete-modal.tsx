"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const DeleteModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-[20px] md:max-w-md lg:max-w-xs w-full">
      <Modal
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button
            disabled={loading}
            size="default"
            onClick={onClose}
            className="bg-gray"
          >
            Cancel
          </Button>
          <Button
            size="default"
            disabled={loading}
            onClick={onConfirm}
            className="bg-main dark:bg-blue hover:bg-none"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
