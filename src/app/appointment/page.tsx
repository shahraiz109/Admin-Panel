"use client";
import PageContainer from "@/components/layout/page-container";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAllAppointmentsQuery } from "@/api/apiSlice";
import { AppointmentTable } from "@/components/tables/appointment/appointment-table";
import { columns } from "@/components/tables/appointment/columns";
import { useSearchParams } from "next/navigation";

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Barbers", link: "/dashboard/appoi" },
// ];

export default function AppointmentPage() {
  const searchParams = useSearchParams();

 const page = searchParams.get('page') ?? '1';
 const limit = searchParams.get('limit') ?? '10';

  
  const {
    data: appointmentData,
    error,
    isLoading,
  } = useAllAppointmentsQuery({ page, limit });

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error fetching appointments</div>;
  }

  const appointments = appointmentData?.data?.results || []; 
  const totalAppointments = appointmentData?.data?.totalResults || 0; 
  const pageCount = appointmentData?.data?.totalPages || 0;

 

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Appointments (${totalAppointments})`}
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
        <AppointmentTable
          searchKey="appointment"
          pageNo={page}
          columns={columns}
          totalAppointments={totalAppointments}
          data={appointments}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
