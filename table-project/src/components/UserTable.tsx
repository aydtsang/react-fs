// ClientComponent.jsx
"use client";

import fetchUsers, { User } from '~/utils/fetchUsers';
import { useQuery } from "@tanstack/react-query";
import { useState, useReducer, useMemo } from 'react';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.name.toUpperCase(), {
        id: "name",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor("website", {
        header: () => <span>Website</span>,
    }),
];
  
export default function UserTable() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    // Set staleTime to see that we get the "Server" output,
    // can later switch tabs to trigger revalidation and see we
    // get the "Client" output
    staleTime: 10000,
  });

  const rerender = useReducer(() => ({}), {})[1];

  const options = {
    data: data??[],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  }

  const table = useReactTable(options);

  return (
    <div>
        {(isLoading || isError)? (<div>...</div>):(
        <>
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={() => rerender()}>
            Rerender
        </button>
        </>
        )}
    </div>
  );
}