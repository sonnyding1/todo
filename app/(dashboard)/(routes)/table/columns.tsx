"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Task = {
    name: string
    description: string
    status: boolean
}

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    }
]