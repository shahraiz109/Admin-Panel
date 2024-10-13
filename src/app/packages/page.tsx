"use client";

import { useAllPackagesQuery } from "@/api/apiSlice";
// import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/package-table/columns";
import { PackageTable } from "@/components/tables/package-table/package-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default function PackagePage() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';

  const {
    data: packageData,
    error,
    isLoading,
  } = useAllPackagesQuery({ page, limit }); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching packages</div>;
  }

  const packages = packageData?.packages?.results || [];
  const totalPackages = packageData?.packages?.totalResults || 0;
  const pageCount = packageData?.packages?.totalPages || 0;

 
  return (
    <PageContainer>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
          <Heading
            title={`Packages (${totalPackages})`}
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
        <PackageTable
          searchKey="packages"
          pageNo={page}
          columns={columns}
          totalPackages={totalPackages}
          data={packages}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
