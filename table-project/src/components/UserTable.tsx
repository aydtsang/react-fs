// ClientComponent.jsx
"use client";

import fetchUsers, { User } from '~/utils/fetchUsers';
import { useQuery } from "@tanstack/react-query";
import { useState, useReducer, useMemo } from 'react';

import {
    PaginationState,
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
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 3,
    })

    const fetchDataOptions = {
        pageIndex,
        pageSize,
    }

    const defaultData = useMemo(() => [], [])

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const rerender = useReducer(() => ({}), {})[1];

    const { 
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ["data", fetchDataOptions],
        queryFn: () => fetchUsers(fetchDataOptions),
        keepPreviousData: true,
    });

    const options = {
        data: data ?? defaultData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: 4,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        manualPagination: true,
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
            <div>
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                {'<<'}
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                {'<'}
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                {'>'}
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                {'>>'}
                </button>
                <span>
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span>
                | Go to page:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1: 0
                        table.setPageIndex(page)
                    }}
                />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                {[3, 6, 9, 12, 15].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </div>
            </>
            )}
        </div>
    );
}