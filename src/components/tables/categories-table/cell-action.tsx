import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import UpdateCategoryModal from "@/components/modal/update-layout-modal";
import { User } from "@/constants/data";

interface CellActionProps {
  data: User;
}

export const CellActions: React.FC<CellActionProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleUpdate = () => {
    if (data.categories.length > 0) {
      const categoryToUpdate = data.categories?.[1];
      setSelectedCategoryId(categoryToUpdate._id);
      setModalOpen(true);
    } else {
      console.error("No categories found for update.");
    }
  };

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Single Update Button */}
          <DropdownMenuItem onClick={handleUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>

          {/* Delete Button */}
          <DropdownMenuItem onClick={() => console.log("Handle delete logic")}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update modal */}
      {modalOpen && (
        <UpdateCategoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={{ categories: data.categories }}
          selectedCategoryId={selectedCategoryId!}
        />
      )}
    </>
  );
};
