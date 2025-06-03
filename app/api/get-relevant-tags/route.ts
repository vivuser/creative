import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { question } = await request.json();

        if (!question) {
            return NextResponse.json(
                { error: 'Question is required' },
                { status: 400 }
            );
        }

        const keywords = question.toLowerCase().split(/\s+/).filter(Boolean);

        const relevantTags = await Prisma.topic.findMany({
            where: {
                OR: keywords.map(keyword)
            }
        })


    }

}