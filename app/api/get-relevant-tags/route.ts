import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

        const relevantTags = await prisma.topic.findMany({
            where: {
                OR: keywords.map((keyword: string) => ({
                    name: { contains: keyword }
                }))
            }
        });

        return NextResponse.json(relevantTags);

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}