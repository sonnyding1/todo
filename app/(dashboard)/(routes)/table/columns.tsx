"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, MoreHorizontal } from "lucide-react";

export type Task = {
    name: string
    description: string
    status: boolean
    priority: "urgent" | "standard" | "optional"
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div>
                    <Checkbox checked={row.getValue("status")} />
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
                        {/* <Badge variant="destructive">
                            {task.priority}
                        </Badge> */}
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

                // <Popover>
                //     <PopoverTrigger asChild>
                //         <Badge variant="destructive">
                //             {task.priority}
                //         </Badge>
                //     </PopoverTrigger>
                //     <PopoverContent>
                //         <DropdownMenu>
                //             <DropdownMenuLabel>Change priority</DropdownMenuLabel>
                //             <DropdownMenuSeparator />
                //             <DropdownMenuItem>Urgent</DropdownMenuItem>
                //             <DropdownMenuItem>Standard</DropdownMenuItem>
                //             <DropdownMenuItem>Optional</DropdownMenuItem>
                //         </DropdownMenu>
                //     </PopoverContent>
                // </Popover>
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
]