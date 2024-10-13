"use client";

import { useAllReviewsQuery } from "@/api/apiSlice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/review-table/columns";
import { ReviewTable } from "@/components/tables/review-table/review-table";
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

export default function ReviewsPage() {
const searchParams=useSearchParams()
  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';



  // Fetch transactions using a hook
  const {
    data: reviewsData,
    error,
    isLoading,
  } = useAllReviewsQuery({ page, limit }); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching transactions</div>;
  }

  const reviews = reviewsData?.reviews?.results || [];
  const totalReviews = reviewsData?.reviews?.totalResults || 0;
  const pageCount = reviewsData?.reviews?.totalPages || 0

 
  

  return (
    <PageContainer>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        <div className="flex items-start justify-between">
          <Heading
            title={`Reviews (${totalReviews})`}
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
        <ReviewTable
          searchKey="reviews"
          pageNo={page}
          columns={columns}
          totalReviews={totalReviews}
          data={reviews}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
