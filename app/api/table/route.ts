import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    const { userId }  = auth();
    const data = await req.json();
    const { name, description, priority, deadline } = data;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    prismadb.task.create({
        data: {
            userId,
            name,
            description,
            priority,
            deadline
        }
    })
    return new NextResponse("OK", { status: 200 });
}

export async function GET() {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const tasks = await prismadb.task.findMany({
        where: {
            userId
        }
    });
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
}

// async function getData(): Promise<Task[]> {
//     // Fetch data from your API here.
//     return [
//       {
//         name: "Task 1",
//         description: "This is the first task.",
//         status: true,
//         priority: "urgent",
//         deadline: new Date('2023-10-13T12:34:56Z')
//       },
//       {
//         name: "Task 2",
//         description: "This is the second task.",
//         status: false,
//         priority: "standard",
//         deadline: new Date('2023-10-13T12:34:56Z')
//       },
//         {
//             name: "Task 3",
//             description: "This is the third task.",
//             status: true,
//             priority: "optional",
//             deadline: new Date('2023-10-13T12:34:56Z')
//         },
//       // ...
//     ]
//   }