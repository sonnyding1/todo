import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { Task } from "@/app/(dashboard)/(routes)/table/columns";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TableDatePickerProps {
    task: Task
}

export default function TableDatePicker({
    task,
}: TableDatePickerProps) {
    const date = task.deadline;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
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
                    onSelect={async (value) => {
                        if (!value) return;
                        task.deadline = value;
                        await axios.put('/api/tasks', {
                                id: task.id,
                                name: task.name,
                                description: task.description,
                                completed: task.completed,
                                priority: task.priority,
                                deadline: task.deadline
                        });
                        setIsOpen(false);
                        router.refresh();
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}