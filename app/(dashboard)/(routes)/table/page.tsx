import { Task, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Task[]> {
    // Fetch data from your API here.
    return [
      {
        name: "Task 1",
        description: "This is the first task.",
        status: true,
        priority: "urgent",
        deadline: new Date('2023-10-13T12:34:56Z')
      },
      {
        name: "Task 2",
        description: "This is the second task.",
        status: false,
        priority: "standard",
        deadline: new Date('2023-10-13T12:34:56Z')
      },
        {
            name: "Task 3",
            description: "This is the third task.",
            status: true,
            priority: "optional",
            deadline: new Date('2023-10-13T12:34:56Z')
        },
      // ...
    ]
  }
  

export default async function TablePage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}