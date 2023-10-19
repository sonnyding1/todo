"use client"

import { Task } from "@/app/(dashboard)/(routes)/table/columns";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface TablePriorityProps {
    task: Task
}

export default function TablePriority({
    task
}: TablePriorityProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Select 
            open={isOpen}
            onOpenChange={setIsOpen}
            onValueChange={async (value) => {
                task.priority = value;
                setIsOpen(false);
                await axios.put('/api/tasks', {
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    completed: task.completed,
                    priority: task.priority,
                    deadline: task.deadline
                }); 
                
                router.refresh();
            }}
            // onOpenChange={(open) => {
            //     router.refresh();
            // }}
            defaultValue={task.priority}
        >
        <SelectTrigger className="w-[180px]">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="optional">Optional</SelectItem>
        </SelectContent>
        </Select>
    );
}