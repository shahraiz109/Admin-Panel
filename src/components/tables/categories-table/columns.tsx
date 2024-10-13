'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { CellActions } from './cell-action';

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
    accessorFn: (row) => row.categories[1]?.title || 'N/A',  
    // accessorFn: (row) => row.categories.map(category => category.title).join(', '), // Option 2: All titles concatenated
    header: 'NAME'
  },
  {
    accessorKey: 'createdAt',
    header: 'DATE'
  },
  {
    accessorKey: 'type',
    header: 'TYPE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    header: 'ACTION',
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />
  }
];
