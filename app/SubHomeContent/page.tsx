import { getAllTopicsFromDb } from "../lib/getTopics";
import SubHomeContent from "./SubHomeContentComponent";


export default async function SubHomeContentPage() {
    const allTopics = await getAllTopicsFromDb();
    console.log(allTopics, 'aiiiiiiiiiiiiiiiiii')

    return <SubHomeContent all={allTopics} />;
}