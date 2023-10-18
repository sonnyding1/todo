import axios from "axios";
import { Button } from "./ui/button";
import { Task } from "@/app/(dashboard)/(routes)/table/columns";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface TableDeleteButtonProps {
    task: Task
}

export default function TableDeleteButton({
    task
}: TableDeleteButtonProps) {
    const router = useRouter();

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
                router.refresh();
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
)
}