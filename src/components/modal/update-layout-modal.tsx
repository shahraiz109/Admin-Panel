import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "@/api/apiSlice"; 

interface Category {
  _id: string;
  title: string;
}

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { categories: Category[] };
  selectedCategoryId: string;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  isOpen,
  onClose,
  data,
  selectedCategoryId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation(); 
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  useEffect(() => {
    if (selectedCategoryId) {
      const category = data.categories.find(
        (cat) => cat?._id === selectedCategoryId
      );
      if (category) {
        setSelectedCategory(category);
        setCategoryTitle(category.title); 
      }
    }
  }, [selectedCategoryId, data.categories]);

  const handleSubmit = async () => {
    if (selectedCategory && categoryTitle.trim() !== "") {
      try {
        const data = {
          type:"Categories",
          categories:{
            title:categoryTitle
          }
        }
     const response =  await updateCategory({
          id: selectedCategory?._id,
          data,
        }).unwrap();
        onClose(); 

        if(response?.success){
          toast.success(response?.message  ||"Category updated successfully!");
        }else{
          toast.error(response?.error?.message || "failed category to update")
        }
      } catch (error:any) {
        console.error("Failed to update category:", error);
        toast.error(error?.data?.message);
      }
    } else {
      toast.error("Category title cannot be empty.");
    }
  };

  if (!isOpen || !selectedCategory) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-6">
        <h2 className="text-lg font-bold">Update Category</h2>

        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="Category title"
            value={categoryTitle} // Bind the input to categoryTitle state
            onChange={(e) => setCategoryTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-main dark:bg-blue"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateCategoryModal;
