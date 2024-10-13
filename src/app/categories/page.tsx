"use client";
import { useState } from "react";

import { useAllCategoriesQuery } from "@/api/apiSlice";
// import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import CreateLayoutModal from "@/components/modal/layout-modal";
import { CategoriesTable } from "@/components/tables/categories-table/cateories-table";
import { columns } from "@/components/tables/categories-table/columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Employee", link: "/dashboard/employee" },
// ];



export default function CategoriesPage() {
  const searchParams = useSearchParams()

  const [isModalOpen, setModalOpen] = useState(false);

  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';

  const {
    data: categoriesData,
    error,
    isLoading,
  } = useAllCategoriesQuery({ page, limit });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching categories</div>;
  }

  const categories = categoriesData?.categories || [];

  const totalCategories = categoriesData?.categories?.length || 0;
  const pageCount = categoriesData?.categories?.totalPages;

  

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
          <Heading title={`Categories (${totalCategories})`} description="" />
          <button
            onClick={handleOpenModal}
            className="default bg-main dark:bg-blue dark:text-white flex h-10 w-32 text-center items-center rounded-lg text-black mt-2 text-sm font-medium ml-1 md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4 items-center ml-3"/> Add New
          </button>
        </div>
        <Separator />

        <CategoriesTable
          searchKey="category"
          pageNo={page}
          columns={columns}
          totalCategories={totalCategories}
          data={categories}
          pageCount={pageCount}
        />
        <CreateLayoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </PageContainer>
  );
}
