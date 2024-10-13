'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../user-tables/cell-action';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
      className='text-red'
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
      className='text-red'
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
    accessorKey: 'cart.services.0.service.name',
    header: 'NAME'
  },
  {
    accessorKey: 'deliveryFee',
    header: 'DELIVERY FEE'
  },
  {
    accessorKey: 'totalPrice',
    header: 'TOTAL PRICE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
 
  {
    header:"ACTION",
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
