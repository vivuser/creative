import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try{
        const { question } = await req.json();

        const newQuestion = await prisma.question.create({
            data : {
                title : question,
                content: question,

            }
        });

        return NextResponse.json(newQuestion);
    } catch (error) {

        return NextResponse.json(
        {
            error: "Failed to save question"
        },
        { status : 500 }
        )
    }

}