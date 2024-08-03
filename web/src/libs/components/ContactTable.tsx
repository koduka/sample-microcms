import type { ContactContent } from '@/libs/data/contact'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/libs/components/ui/table'
import { searchContacts } from '@/libs/data/contact'
import { formatDate } from '@/libs/utils/date'
import { keepPreviousData, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  pageIndex?: number
  pageSize?: number
}

const columns: ColumnDef<ContactContent>[] = [
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'お問い合わせ日時',
    cell: ({ row }) => <div>{formatDate(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'お名前',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'メールアドレス',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
]

function InnerContactTable({ pageIndex = 0, pageSize = 10 }: Props) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  })

  const query = useQuery({
    queryKey: [],
    queryFn: () => {
      return searchContacts({
        offset: pagination.pageIndex,
        limit: pagination.pageSize,
      }).catch((e) => {
        toast.error(e.message)
      })
    },
    placeholderData: keepPreviousData,
  })

  const table = useReactTable({
    columns,
    data: query.data?.contents ?? [],
    getCoreRowModel: getCoreRowModel<ContactContent>(),
    getPaginationRowModel: getPaginationRowModel<ContactContent>(),
    rowCount: query.data?.totalCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    autoResetPageIndex: true,
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getCoreRowModel().rows.length ? (
          table.getCoreRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                console.log('cell', cell.getContext().renderValue())
                return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>お問い合わせはございません。</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export function ContactTable({ pageIndex, pageSize }: Props) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <InnerContactTable pageIndex={pageIndex} pageSize={pageSize} />
    </QueryClientProvider>
  )
}
