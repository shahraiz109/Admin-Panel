import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateAdminServiceMutation } from "@/api/apiSlice";

const UpdateServiceModal = ({
  isOpen,
  onClose,
  categoryId,
  serviceId,
  service,
}) => {
  console.log("🚀 ~ serviceId:line no =========== 14", serviceId)
  console.log("🚀 ~ categoryId:line no ===========15", categoryId)
  const [serviceName, setServiceName] = useState(
    service?.serviceName || ""
  );
  const [serviceImage, setServiceImage] = useState(service?.avatar);
  const [updateService, { isLoading }] = useUpdateAdminServiceMutation();

  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!serviceName || (!serviceImage && !service)) {
      toast.error("Service name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", serviceName);
    if (serviceImage) {
      formData.append("image", serviceImage);
    }

    try {
      // Call the update service API
      const response = await updateService({
        categoryId,
        serviceId,
        formData,
      }).unwrap();

      onClose(); // Close the modal

      if (response) {
        toast.success(response?.message || "Service updated successfully!");
      } else {
        toast.error("Error while updating service!");
      }
    } catch (error) {
      toast.error("Failed to update service.");
      console.error("Error updating service:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4 dark:text-slate-600">
          Update Service
        </h2>

        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="input input-bordered w-full dark:text-slate-600"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full dark:text-slate-600"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            size="default"
            className="bg-main dark:bg-blue hover:bg-none"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <Button onClick={onClose} size="default" className="bg-main dark:bg-blue">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
