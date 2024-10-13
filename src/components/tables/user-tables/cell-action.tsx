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
import UpdateServiceModal from "@/components/modal/update-service-modal";
import { User } from "@/constants/data";
import { useDeleteAdminServiceMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import { DeleteModal } from "@/components/modal/delete-modal";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  console.log("🚀 ~ data:line no =======22", data)
  const [deleteAdminService] = useDeleteAdminServiceMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const categoryId = data.categories?.[1]?._id || "";
  const serviceId = data?.categories?.[1]?.services?.[0]?._id;

  const handleUpdateClick = () => {
    setModalOpen(true);
    const categoryId = data?._id|| "";
  const serviceId = data?.id || "";
  setSelectedCategoryId(categoryId)
  setSelectedServiceId(serviceId);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteAdminService({
        categoryId,
        serviceId,
      }).unwrap();
     
      if (response) {
        toast.success("Service deleted successfully!");
      } else {
        toast.error("Error while deleting the service!");
      }
    } catch (error) {
      console.error("Failed to delete service: ", error);
      toast.error("Error while deleting the service!");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false); 
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleUpdateClick}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick} disabled={isDeleting}>
            <Trash className="mr-2 h-4 w-4" />{" "}
            {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render UpdateServiceModal for updates */}
      {isModalOpen && (
        <UpdateServiceModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          categoryId={selectedCategoryId}
          serviceId={selectedServiceId}
          service={data}
        />
      )}

      {/* Confirmation Modal for Deletion */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete} 
          loading={isDeleting}
        />
      )}
    </>
  );
};
