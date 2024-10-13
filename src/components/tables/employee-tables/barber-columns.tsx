'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='text-main'
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className='text-main'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'serialNo',
    header: 'NO',
    cell: ({ row }) => row.index + 1, 
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'PHONE'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'avatar.key',
    header: 'AVATAR',
    cell: ({ row }) => {
      const dummyImageUrl = "https://picsum.photos/150"; 
      return (
        <div className="flex justify-center items-center">
          <Image
            src={dummyImageUrl} 
            alt={row.original.name} 
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover mr-2" 
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'gender',
    header: 'GENDER'
  },
  {
    header:"ACTIONS",
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
