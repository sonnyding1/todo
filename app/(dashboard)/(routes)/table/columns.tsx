"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
            return (
                <div>
                    <Checkbox checked={row.getValue("completed")} />
                </div>
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
            )
        }
    },
    {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: ({ row }) => {
            const task = row.original;
            const date = task.deadline;

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className="font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            // onSelect={}
                            // TODO: change db date
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            )
        }
    },
    {
        accessorKey: 'delete',
        header: '',
        cell: ({ row }) => {
            const task = row.original;

            return (
                <Button 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-500"
                    onClick={async () => {
                        await axios.delete('/api/tasks', {
                            data: {
                                id: task.id
                            }
                        })
                        window.location.reload();
                        // deleteTask(task);
                        // TODO: router reload in columns?
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )
        }
    }
]