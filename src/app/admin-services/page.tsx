"use client";
import { useState } from "react";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useAllAdminServicesQuery } from "@/api/apiSlice";
import { AdminServicesTable } from "@/components/tables/admin-services-table/sevices-table";
import { columns } from "@/components/tables/admin-services-table/columns";
import CreateServiceModal from "@/components/modal/create-service-modal";
import { useSearchParams } from "next/navigation";

export default function AdminServicesPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); 

  // Fetch services data
  const {
    data: adminServicesData,
    error,
    isLoading,
  } = useAllAdminServicesQuery({ page, limit });
    console.log("🚀 ~ AdminServicesPage ~ adminServicesData:line no ============ 28", adminServicesData)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching services</div>;
  }

  const services = adminServicesData?.services || [];
  console.log("🚀 ~ AdminServicesPage ~ services:line no ========= 38", services)

  // Flatten the data structure
  const flattenedData = services.flatMap((service) =>
    service.categories.map((category) =>
      category.services.map((srv) => ({
        id: srv._id, 
        name: category.title, 
        avatar: srv.image?.key || "https://picsum.photos/150",
        type: service.type, 
        serviceName: srv.name 
      }))
    )
  ).flat(); 

  // const totalServices = flattenedData.length || 0;
  const totalServices = adminServicesData?.services?.length
  const pageCount = adminServicesData?.services?.totalPages || 0;

  // Modal handlers
  const handleOpenModal = () => {
    const categories = services?.[0]?.categories?.[1]?._id || [];

    if (!categories) {
      console.error("categoryId is undefined");
      return;
    }
    setSelectedCategoryId(categories);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategoryId(null); 
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Services (${totalServices})`} description="" />
          <button
            onClick={handleOpenModal} 
            className="default bg-main dark:bg-blue dark:text-white flex h-10 w-32 text-center items-center rounded-lg text-black mt-2 text-sm font-medium ml-1 md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4 items-center ml-3" /> Add New
          </button>
        </div>
        <Separator />

        <AdminServicesTable
          searchKey="serviceName"
          pageNo={page}
          columns={columns}
          totalServices={totalServices}
          data={flattenedData} 
          pageCount={pageCount}
        />

        {/* Create Service Modal */}
        <CreateServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          categoryId={selectedCategoryId} 
        />
      </div>
    </PageContainer>
  );
}
