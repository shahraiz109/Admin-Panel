import { useState } from "react";
import { useCreateCategoryMutation } from "@/api/apiSlice";
import { Button } from "@/components/ui/button"; // Import Button from shadcn
import { Input } from "../ui/input";
import { toast } from "react-toastify";

const CreateLayoutModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([{ title: "" }]); // default state
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleAddCategory = () => {
    setCategories([...categories, { title: "" }]);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].title = value;
    setCategories(newCategories);
  };

  const handleSubmit = async () => {
    const payload = {
      type: "Categories",
      categories,
    };

    try {
     const response =  await createCategory(payload).unwrap();
      onClose();
      if(response){
        toast.success(response?.message || "Layout created successfully!")
      }else{
        toast.error(response?.error?.message || "error while creating layout!")
      }
    } catch (error) {
      console.error("Failed to create layout", error);
    }
  };

//   const handleRemoveCategory = (index) => {
//     const newCategories = categories.filter((_, i) => i !== index);
//     setCategories(newCategories);
//   };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-900">Add New Layout</h2>

        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="text"
              placeholder="Category title"
              value={category.title}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              className="input input-bordered w-full dark:text-black"
            />
            {/* {categories.length > 1 && (
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveCategory(index)}
              >
                Remove
              </button>
            )} */}
          </div>
        ))}

        {/* <button
          className="text-blue-500 mb-4"
          onClick={handleAddCategory}
        >
          Add More Categories
        </button> */}

        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-main dark:bg-blue"
          >
            Add
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLayoutModal;
