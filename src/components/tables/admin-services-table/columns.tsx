'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../user-tables/cell-action';
import Image from 'next/image';

export const columns: ColumnDef<User>[] = [
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
    accessorFn: (row) => row.name, 
    header: 'NAME',
  },
  {
    id: 'avatar',
    header: 'AVATAR',
    cell: ({ row }) => {
      const imageUrl = row?.avatar || "https://picsum.photos/150"; 
      return (
        <div className="flex justify-center items-center">
          <Image
            src={imageUrl} 
            alt={'No Image'} 
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover" 
          />
        </div>
      );
    }
  },
  // {
  //   accessorKey: 'type',
  //   header: 'TYPE',
  // },
  {
    id: 'serviceName',
    header: 'SERVICE NAME',
    accessorFn: (row) => row?.serviceName, // Use the service name
  },
  {
    header: 'ACTION',
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];