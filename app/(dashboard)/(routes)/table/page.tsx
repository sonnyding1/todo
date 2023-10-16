"use client"


import { useForm } from "react-hook-form";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import prismadb from "@/lib/prismadb";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


export default async function TablePage() {
    // const data = await getData();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        description: "",
        priority: "standard",
        deadline: new Date(),
      }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
      // TODO: try catch
      const response = axios.post('/api/tasks', data);
    }

    const data = await axios.get('/api/tasks').then((response) => {
      return response.data;
    });

    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
      </div>
    );
}