import { Task, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Task[]> {
    // Fetch data from your API here.
    return [
      {
        name: "Task 1",
        description: "This is the first task.",
        status: true,
      },
      {
        name: "Task 2",
        description: "This is the second task.",
        status: false,
      },
        {
            name: "Task 3",
            description: "This is the third task.",
            status: true,
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