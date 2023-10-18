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
import TablePriority from "@/components/table-priority";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";

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
            // return (
            //     <div>
            //         <Checkbox 
            //             checked={task.completed} 
            //             onCheckedChange={async () => {
            //                 task.completed = !task.completed;
            //                 await axios.put('/api/tasks', {
            //                     id: task.id,
            //                     name: task.name,
            //                     description: task.description,
            //                     completed: task.completed,
            //                     priority: task.priority,
            //                     deadline: task.deadline
            //                 });
            //                 // router.refresh();
            //             }}
            //         />
            //     </div>
            // )
        }
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
            const task = row.original;

            return (
                <TablePriority task={task} />
            )
            // return (
            //     <Select 
            //         onValueChange={async (value) => {
            //             task.priority = value;
            //             await axios.put('/api/tasks', {
            //                 id: task.id,
            //                 name: task.name,
            //                 description: task.description,
            //                 completed: task.completed,
            //                 priority: task.priority,
            //                 deadline: task.deadline
            //             }); 
            //             // router.refresh();
            //         }}
            //         defaultValue={task.priority}
            //     >
            //     <SelectTrigger className="w-[180px]">
            //         <SelectValue placeholder="standard" />
            //     </SelectTrigger>
            //     <SelectContent>
            //         <SelectItem value="urgent">Urgent</SelectItem>
            //         <SelectItem value="standard">Standard</SelectItem>
            //         <SelectItem value="optional">Optional</SelectItem>
            //     </SelectContent>
            //     </Select>
            // );
        }
    },
    {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: ({ row }) => {
            const task = row.original;
            const date = task.deadline;
            return (
                <TableDatePicker task={task} />
            )
            // return (
            //     <Popover>
            //         <PopoverTrigger asChild>
            //             <Button variant={"outline"} className="font-normal">
            //                 <CalendarIcon className="mr-2 h-4 w-4" />
            //                 {date ? format(date, "PPP") : <span>Pick a date</span>}
            //             </Button>
            //         </PopoverTrigger>
            //         <PopoverContent className="w-auto p-0">
            //             <Calendar
            //                 mode="single"
            //                 selected={date}
            //                 onSelect={async (value) => {
            //                     if (!value) return;
            //                     task.deadline = value;
            //                     await axios.put('/api/tasks', {
            //                             id: task.id,
            //                             name: task.name,
            //                             description: task.description,
            //                             completed: task.completed,
            //                             priority: task.priority,
            //                             deadline: task.deadline
            //                     });
            //                     // router.refresh();
            //                 }}
            //                 initialFocus
            //             />
            //         </PopoverContent>
            //     </Popover>
            // );
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
            // return (
            //     <Button 
            //         variant="ghost"
            //         size="icon"
            //         className="hover:bg-red-500"
            //         onClick={async () => {
            //             await axios.delete('/api/tasks', {
            //                 data: {
            //                     id: task.id
            //                 }
            //             })
            //             // router.refresh();
            //         }}
            //     >
            //         <Trash2 className="h-4 w-4" />
            //     </Button>
            // )
        }
    }
]