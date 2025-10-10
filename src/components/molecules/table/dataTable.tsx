"use client";

import React from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type TableOptions } from "@tanstack/react-table";
import { Skeleton } from "@/components/atoms";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  loadingRows?: number;
  className?: string;
  tableOptions?: Partial<TableOptions<TData>>;
}

function DataTable<TData>({
  data,
  columns,
  isLoading = false,
  error = null,
  emptyMessage = "No data found.",
  loadingRows = 10,
  className = "",
  tableOptions = {},
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  // Error state
  if (error) {
    return (
      <div className="rounded-md border">
        <div className="text-center py-8 text-red-500" role="alert">
          Failed to load data. Please try again later.
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((_, index) => (
                  <th key={index} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(loadingRows)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="p-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Main table
  return (
    <div className={`rounded-md border ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
