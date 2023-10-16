"use client"


import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required."
    }),
    description: z.string(),
    priority: z.string().min(1, {
        message: "Priority is required."
    }),
    deadline: z.date()
  });