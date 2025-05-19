// components/SubHomeContent.tsx
"use client";
import React, { useState } from "react";
import AnswerDetail from "./answerDetail";
import TopicDetail from "./TopicDetail";

interface TopicItem {
  questionDetails: {
    [key: string]: {
      question: string; // Replacing 'detail' with 'question'
      upvotes: number; // Replacing 'uv' with 'upvotes'
      downvotes: number; // Replacing 'dv' with 'downvotes'
      helpfulCount: number; // Replacing 'hc' with 'helpfulCount'
      comments: string[]; // Replacing 'c' with 'comments'
    };
  };
}

interface AllTopics {
  [key: string]: TopicItem[];
}

const SubHomeContent = ({ all }: { all: AllTopics }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeAnswer, setActiveAnswer] = useState<any>(null);

  const handleClickTopic = (topic: string) => {
    setActiveTopic((prev) => (prev === topic ? null : topic));
    setActiveAnswer(null);
  };

  const handleShowAnswer = (answerData: any) => {
    setActiveAnswer(answerData);
  };

  const dataToShow = activeTopic ? { [activeTopic]: all[activeTopic] ?? [] } : null;

  console.log(dataToShow, 'dis....')

  return (
    <div className="flex flex-row gap-6 h-full m-8">
      {/* Left column */}
      <div className="w-1/4 bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Topics</h2>
        {Object.keys(all).map((topic) => (
          <p
            key={topic}
            className={`m-2 px-3 py-2 rounded cursor-pointer ${
              activeTopic === topic
                ? "bg-amber-200"
                : "bg-gray-300 hover:bg-amber-100"
            }`}
            onClick={() => handleClickTopic(topic)}
          >
            {topic}
          </p>
        ))}
      </div>

      {/* Middle column */}
      <div className="w-1/4 bg-white p-4 rounded border">
        {dataToShow ? (
          <TopicDetail dataToShow={dataToShow} onShowAnswer={handleShowAnswer} />
        ) : (
          <p className="text-gray-500">Select a topic</p>
        )}
      </div>

      {/* Right column */}
      <div className="flex-1 bg-white p-4 rounded border">
        {activeAnswer ? (
          <AnswerDetail data={activeAnswer} />
        ) : (
          <p className="text-gray-500">Select an answer to view details</p>
        )}
      </div>
    </div>
  );
};

export default SubHomeContent;