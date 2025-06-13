import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import OpenAI from "openai";



// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });


// const supabase = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_KEY!
//   );


  type MockQuestion = {
    id: string,
    text: string;
    content?: string;
    tags: string[];
  };

 // Mock database of questions with categories
 export const MOCK_QUESTIONS_DB: MockQuestion[] = [
  { 
    id: '1',
    text: "How do I use React hooks?",
    content: "Detailed explanation about React hooks...", 
    tags: ["react", "hooks", "basics"] 
  },
  { 
    id: '2',
    text: "What's the difference between useEffect and useMemo?",
    content: "Comparison between these two hooks...",
    tags: ["react", "hooks", "comparison"] 
  },
  { 
    id: '3',
    text: "Best practices for React state management",
    content: "Guide to managing state in React...",
    tags: ["react", "state", "advanced"] 
  },
    { 
    id: '4',
      text: "How to optimize React performance?", 
      tags: ["react", "performance"] 
    },
    { 
    id: '5',
      text: "React vs Vue: which one to learn?", 
      tags: ["comparison", "frameworks"] 
    },
    {
    id: '6',
      text: "How to fetch data in Next.js?",
      tags: ["nextjs", "data-fetching"]
    }
  ];
  

export async function POST(req: Request) {

    console.log('trying')

    try {
        const { question } = await req.json();
        if (!question || typeof question !== 'string') {
            return NextResponse.json(
              { error: "Invalid question format" },
              { status: 400 }
            );
          }
      
          // Simple keyword matching (replace with real embeddings later)
          const keywords: string[] = question.toLowerCase().split(/\s+/);
  // Find questions with matching tags/keywords

  const similarQuestions = MOCK_QUESTIONS_DB
    .filter(q => 
      keywords.some(kw => 
        q.text.toLowerCase().includes(kw) || 
        q.tags.some(tag => tag.includes(kw))
      )
    )
    .slice(0, 5); // Return max 5 matches

        console.log(question, req,'ggggg')

        // if (!question) {
        //     return NextResponse.json(
        //         {message : 'Question is required' },
        //         {status : 400 }
        //     );
        // }

        // const embedding = await openai.embeddings.create({
        //     input: question,
        //     model: 'text-embedding-ada-002',
        // });

        // const embeddingArray = embedding.data[0].embedding;

        // const { data: similarQuestions } = await supabase.rpc('match_questions', {
        //     query_embedding: embeddingArray,
        //     similarity_threshold: 0.78,
        //     match_count: 5,
        // });

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    similarQuestions: similarQuestions.length > 0 
      ? similarQuestions
      : ["No similar questions found. Try rephrasing."]
  });

    } catch (error) {
        console.error('Error checking similar questions', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }

}
