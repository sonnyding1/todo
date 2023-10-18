"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useRouter } from "next/navigation";
import TableDatePicker from "@/components/table-date-picker";
import TableDeleteButton from "@/components/table-delete-button";
import TableCompleted from "@/components/table-completed";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export async function deleteTask(task: Task) {
    const router = useRouter();

    await axios.delete('/api/tasks', {
        data: {
            id: task.id
        }
    })
    // window.location.reload();
    router.refresh();
}

export type Task = {
    id: string
    name: string
    description: string | null
    completed: boolean
    priority: string
    deadline: Date
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
        accessorKey: 'completed',
        header: 'Completed',
        cell: ({ row }) => {
            const task = row.original;
            return (
                <TableCompleted task={task} />
            )
        }
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
            const task = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-6 rounded-full py-0 text-sm font-light">
                            {task.priority}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Change priority</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Urgent</DropdownMenuItem>
                        <DropdownMenuItem>Standard</DropdownMenuItem>
                        <DropdownMenuItem>Optional</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                // <FormItem className="flex flex-col space-y-2">
                //     <FormLabel>Priority</FormLabel>
                //     <FormControl>
                //         <Select 
                //             onValueChange={}
                //             defaultValue={task.priority}
                //         >
                //         <SelectTrigger className="w-[180px]">
                //             <SelectValue placeholder="standard" />
                //         </SelectTrigger>
                //         <SelectContent>
                //             <SelectItem value="urgent">Urgent</SelectItem>
                //             <SelectItem value="standard">Standard</SelectItem>
                //             <SelectItem value="optional">Optional</SelectItem>
                //         </SelectContent>
                //         </Select>
                //     </FormControl>
                // </FormItem>
            )
        }
    },
    {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: ({ row }) => {
            const task = row.original;
            return (
                <TableDatePicker task={task} />
            )
        }
    },
    {
        accessorKey: 'delete',
        header: '',
        cell: ({ row }) => {
            const task = row.original;

            return (
                <TableDeleteButton task={task} />
            )
        }
    }
]