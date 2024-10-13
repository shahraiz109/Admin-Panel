// import { Breadcrumbs } from '@/components/breadcrumbs';
// import PageContainer from '@/components/layout/page-container';
// import { UserClient } from '@/components/tables/user-tables/client';
// import { users } from '@/constants/data';

// const breadcrumbItems = [
//   { title: 'Dashboard', link: '/dashboard' },
//   { title: 'User', link: '/dashboard/user' }
// ];
// export default function page() {
//   return (
//     <PageContainer>
//       <div className="space-y-2">
//         <Breadcrumbs items={breadcrumbItems} />
//         <UserClient data={users} />
//       </div>
//     </PageContainer>
//   );
// }

"use client"
import { useAllUsersQuery } from "@/api/apiSlice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable, UserTable } from "@/components/tables/employee-tables/user-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Employee", link: "/dashboard/employee" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default  function UserPage({ searchParams }: paramsProps) {
  // const page = Number(searchParams.page) || 1;
  // const pageLimit = Number(searchParams.limit) || 10;
  // const country = searchParams.search || null;
  // const offset = (page - 1) * pageLimit;

  // const res = await fetch(
  //   `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
  //     (country ? `&search=${country}` : '')
  // );
  // const employeeRes = await res.json();
  // const totalUsers = employeeRes.total_users; //1000
  // const pageCount = Math.ceil(totalUsers / pageLimit);
  // const employee: Employee[] = employeeRes.users;

  const [page, setPage] = useState(1);
  const pageLimit = 10;

  const {
    data: usersData,
    error,
    isLoading,
  } = useAllUsersQuery({ page, limit: pageLimit });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users</div>;
  }

  const users = usersData?.users || [];
  const totalUsers = usersData?.users?.totalResults || 0;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
        <Heading
            title={`Users (${totalUsers})`}
            description="Manage users (Server side table functionalities.)"
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
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={users?.results}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </PageContainer>
  );
}
