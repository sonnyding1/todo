import CreateTaskForm from "@/components/create-task-form";


export default function TablePage() {
    return (
      <div>
        <CreateTaskForm />
        {/* <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div> */}
      </div>
    );
}