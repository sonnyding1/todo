import { Task } from "@/app/(dashboard)/(routes)/table/columns";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import axios from "axios";

interface TableCompletedProps {
    task: Task
}

export default function TableCompleted({
    task
}: TableCompletedProps) {
    const router = useRouter();

    return (
        <div>
            <Checkbox 
                checked={task.completed} 
                onCheckedChange={async () => {
                    task.completed = !task.completed;
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
            />
        </div>
    )
}