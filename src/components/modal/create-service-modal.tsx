"use client"
import { useCreateAdminServiceMutation } from "@/api/apiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateServiceModal = ({ isOpen, onClose, categoryId }) => {
  const [serviceName, setServiceName] = useState(""); 
  const [serviceImage, setServiceImage] = useState(null);
  const [createService, { isLoading }] = useCreateAdminServiceMutation();

  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]); 
  };

  const handleSubmit = async () => {
    if (!serviceName || !serviceImage) {
      toast.error("Both service name and image are required.");
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append("name", serviceName);   
    formData.append("image", serviceImage);  
  
    try {
      const response = await createService({
        categoryId, 
        formData,  
      }).unwrap();
  
      onClose();
      if (response) {
        toast.success(response?.message || "Service created successfully!");
      } else {
        toast.error("Error while creating service!");
      }
    } catch (error) {
      toast.error("Failed to create service.");
      console.error("Error creating service:", error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-600">Add New Service</h2>

        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="input input-bordered w-full dark:text-gray-600"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full dark:text-gray-600"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
          size="default"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-main dark:bg-blue hover:bg-none"
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
          <Button size="default" onClick={onClose} className="bg-main dark:bg-blue">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceModal;
