import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET() {
    try {
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
    } catch (error) {
        console.log(error);
        return new NextResponse("Bad Request", { status: 400 });
    }
}

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

export async function DELETE(req: Request) {
    try {
        const { userId } = auth();
        const { id } = await req.json();
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const task = await prismadb.task.findUnique({
            where: {
                id
            }
        });
    
        if (!task) {
            return new NextResponse("Not Found", { status: 404 });
        }
    
        await prismadb.task.delete({
            where: {
                id
            }
        });
    
        return new NextResponse("OK", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Bad Request", { status: 400 });
    }
}