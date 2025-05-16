import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import OpenAI from "openai";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );


export async function POST(req: Request) {

    console.log('trying')

    try {
        const { question } = await req.json();

        console.log(question, req,'ggggg')

        if (!question) {
            return NextResponse.json(
                {message : 'Question is required' },
                {status : 400 }
            );
        }

        const embedding = await openai.embeddings.create({
            input: question,
            model: 'text-embedding-ada-002',
        });

        const embeddingArray = embedding.data[0].embedding;

        const { data: similarQuestions } = await supabase.rpc('match_questions', {
            query_embedding: embeddingArray,
            similarity_threshold: 0.78,
            match_count: 5,
        });

        return NextResponse.json({ similarQuestions });
    } catch (error) {
        console.error('Error checking similar questions', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }

}
