import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId }  = auth();
        const data = await req.json();
        const { name, description, priority, deadline } = data;
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const newUser = await prismadb.task.create({
            data: {
                userId,
                name,
                description,
                priority,
                deadline
            }
        });
        console.log(newUser);
        return new NextResponse("OK", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Bad Request", { status: 400 });
    }
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