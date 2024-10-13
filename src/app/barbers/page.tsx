"use client";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/employee-tables/barber-columns";
import { BarberTable } from "@/components/tables/employee-tables/barber-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAllBarbersQuery } from "@/api/apiSlice";
import { useSearchParams } from "next/navigation";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Barbers", link: "/dashboard/barber" },
// ];

export default function BarberPage() {
  const searchParams = useSearchParams()

  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';

  const {
    data: barbersData,
    error,
    isLoading,
  } = useAllBarbersQuery({ page, limit });

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error fetching barbers</div>; 
  }

  const barbers = barbersData?.barbers || []; 
  const totalBarbers = barbersData?.barbers.totalResults|| 0; 
  const pageCount = barbersData?.barbers.totalPages || 0; 

 

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Barbers (${totalBarbers})`}
            description=""
          />
          <Link
            href="/dashboard/barber/new"
            className="default bg-main dark:bg-blue dark:text-white flex h-10 w-32 text-center items-center rounded-lg text-black mt-2 text-sm font-medium ml-1 md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4 items-center ml-3" /> Add New
          </Link>
        </div>
        <Separator />
        <BarberTable
          searchKey="barber"
          pageNo={page}
          columns={columns}
          totalUsers={totalBarbers}
          data={barbers?.results}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
