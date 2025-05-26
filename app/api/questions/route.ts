import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {

    try{
        const { question, userId } = await req.json();

        const newQuestion = await prisma.question.create({
            data : {
                title : question,
                content: question,

            },
            select: {
                id: true,
                title: true,
            }
        });

        return NextResponse.json({
            success: true,
            question: newQuestion,
            redirectTo: `/questions/${newQuestion.id}` // Include redirect path
        });

    } catch (error) {

        return NextResponse.json(
        {
            error: "Failed to save question"
        },
        { status : 500 }
        )
    }

}