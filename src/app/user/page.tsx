"use client"
import { useAllUsersQuery } from "@/api/apiSlice";
// import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/employee-tables/columns";
import { UserTable } from "@/components/tables/employee-tables/user-table";
// import { EmployeeTable, UserTable } from "@/components/tables/employee-tables/user-table";
// import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Employee", link: "/dashboard/employee" },
// ];



export default  function UserPage() {
 
  const searchParams = useSearchParams()

  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';

  const {
    data: usersData,
    error,
    isLoading,
  } = useAllUsersQuery({ page, limit });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users</div>;
  }

  const users = usersData?.users || [];
  const totalUsers = usersData?.users?.totalResults || 0;
  const pageCount = usersData?.users?.totalPages || 0;


  return (
    <PageContainer>
      <div className="space-y-4">
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
        <Heading
            title={`Users (${totalUsers})`}
            description=""
          />

          <Link
            href={"/dashboard/employee/new"}
            className="default bg-main dark:bg-blue dark:text-white flex h-10 w-32 text-center items-center rounded-lg text-black mt-2 text-sm font-medium ml-1 md:text-sm"
          >
            <Plus className="mr-2 h-4 w-4 items-center ml-3" /> Add New
          </Link>
        </div>
        <Separator />

        <UserTable
          searchKey="user"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={users?.results}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
