"use client";

import { useAllServicesQuery } from "@/api/apiSlice";
// import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/service-table/columns";
import { ServicesTable } from "@/components/tables/service-table/service-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Transactions", link: "/dashboard/transactions" },
// ];

export default function ServicesPage() {
  const searchParams = useSearchParams()

  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';


  const {
    data: servicesData,
    error,
    isLoading,
  } = useAllServicesQuery({ page, limit }); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching services</div>;
  }

  const services = servicesData?.services?.results || [];
  const totalServices = servicesData?.services?.totalResults || 0;
  const pageCount = servicesData?.services?.totalPages || 0;


  return (
    <PageContainer>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
          <Heading
            title={`Services (${totalServices})`}
            description=""
          />

          <Link
            href={"/dashboard/transactions/new"}
            className="default bg-main dark:bg-blue dark:text-white flex h-10 w-32 text-center items-center rounded-lg text-black mt-2 text-sm font-medium ml-1 md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4 items-center ml-3" /> Add New
          </Link>
        </div>
        <Separator />

        {/* Transaction Table */}
        <ServicesTable
          searchKey="service"
          pageNo={page}
          columns={columns}
          totalServices={totalServices}
          data={services}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
