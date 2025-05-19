import { getAllTopicsFromDb } from "../lib/getTopics";
import SubHomeContent from "./SubHomeContentComponent";


interface QuestionDetail {
    question: string;
    upvotes: number;
    downvotes: number;
    helpfulCount: number;
    comments: string[];
  }

interface TopicItem {
    questionDetails: Record<string, QuestionDetail>;  // More flexible than fixed key
  }
interface AllTopics {
    [key: string]: TopicItem[];  // Object with string keys and array values
  }

export default async function SubHomeContentPage() {
    const rawTopics = await getAllTopicsFromDb();

    console.log(rawTopics, 'rottt...');

    // Transform rawTopics to match the AllTopics type
    const transformedTopics: AllTopics = Object.fromEntries(
        Object.entries(rawTopics).map(([key, value]) => [
            key,
            value.map((item) => ({
                questionDetails: Object.fromEntries(
                    Object.entries(item.nui).map(([innerKey, innerValue]) => [
                        innerKey,
                        {
                            question: innerValue.detail,
                            upvotes: innerValue.uv,
                            downvotes: innerValue.dv,
                            helpfulCount: innerValue.hc,
                            comments: innerValue.c,
                        },
                    ])
                ),
            })),
        ])
    );

    return <SubHomeContent all={transformedTopics} />;
  }