"use client";

import { useAllTransctionsQuery } from "@/api/apiSlice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/transections-table/columns";
import { TransectionTable } from "@/components/tables/transections-table/transection-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Transactions", link: "/dashboard/transactions" },
// ];

export default function TransactionsPage() {
  // Pagination and filter states
 const searchParams = useSearchParams();

 const page = searchParams.get('page') ?? '1';
 const limit = searchParams.get('limit') ?? '10';


  // Fetch transactions using a hook
  const {
    data: transactionsData,
    error,
    isLoading,
  } = useAllTransctionsQuery({ page, limit }); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching transactions</div>;
  }

  const transactions = transactionsData?.results || [];
  const totalTransactions = transactionsData?.totalResults || 0;
  const pageCount = transactionsData?.totalPages || 0;


  return (
    <PageContainer>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
          <Heading
            title={`Transactions (${totalTransactions})`}
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
        <TransectionTable
          searchKey="transaction"
          pageNo={page}
          columns={columns}
          totalTransactions={totalTransactions}
          data={transactions}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
