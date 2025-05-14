"use client";
import React, { useState } from "react";
import AnswerDetail from "./answerDetail";
import TopicDetail from "./TopicDetail";

interface TopicItem {
  nui: {
    [key: string]: {
      detail: string;
      uv: number;
      dv: number;
      hc: number;
      c: string[];
    };
  };
}

interface AllTopics {
  [key: string]: TopicItem[];
}

const all: AllTopics = {
  nu1: [
    {
      nui: {
        value1: {
          detail: "hhhysdsfsdfsfsfsfssdfsdfsdfdskhsdfkdfkds sdfhds fldsf sdklfjklsdf",
          uv: 10,
          dv: 2,
          hc: 10,
          c: ["good", "well"],
        },
      },
    },
    {
      nui: {
        value2: {
          detail: "hhh",
          uv: 8,
          dv: 1,
          hc: 5,
          c: ["okay", "fine"],
        },
      },
    },
  ],
  nu2: [
    {
      nui: {
        value3: {
          detail: "another one",
          uv: 12,
          dv: 0,
          hc: 6,
          c: ["cool"],
        },
      },
    },
  ],
};

const SubHomeContent = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeAnswer, setActiveAnswer] = useState<any>(null);

  const handleClickTopic = (topic: string) => {
    setActiveTopic((prev) => (prev === topic ? null : topic));
    setActiveAnswer(null);
  };


  const handleShowAnswer = (answerData: any) => {
    setActiveAnswer(answerData);
  };
  
  const dataToShow = activeTopic
    ? { [activeTopic]: all[activeTopic] ?? [] }
    : null;

    return (
      <div className="flex flex-row gap-6 h-full m-8">
        {/* Left column: topic list (fixed width) */}
        <div className="w-1/4 bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">lorsks</h2>
          {Object.keys(all).map((topic) => (
            <div key={topic}>
              <p
                className={`m-2 px-3 py-2 rounded cursor-pointer ${
                  activeTopic === topic
                    ? "bg-amber-200"
                    : "bg-gray-300 hover:bg-amber-100"
                }`}
                onClick={() => handleClickTopic(topic)}
              >
                {topic}
              </p>
            </div>
          ))}
        </div>
    
        {/* Middle column: topic details (fixed width) */}
        <div className="w-1/4 bg-white p-4 rounded border">
          {dataToShow ? (
            <TopicDetail 
              dataToShow={dataToShow}
              onShowAnswer={handleShowAnswer}
            />
          ) : (
            <p className="text-gray-500">Select a topic</p>
          )}
        </div>
    
        {/* Right column: answer detail (flexible remaining space) */}
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