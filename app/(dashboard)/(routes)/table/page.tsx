import CreateTaskForm from "@/components/create-task-form";
import axios from "axios";
import { DataTable } from "./data-table";
import { Task, columns } from "./columns";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";


export default async function TablePage() {
    const { userId } = auth();
    if (!userId) {
        return <div>Not logged in</div>
    }
    const tasks = await prismadb.task.findMany({
        where: {
            userId
        }
    })
    const data: Task[] = tasks.map((task) => {
      const { id, userId, name, description, priority, completed, deadline } = task;
      return { id, name, description, priority, completed, deadline};
    })

    return (
      <div>
        <CreateTaskForm />
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
      </div>
    );
}