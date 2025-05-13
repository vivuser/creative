"use client";
import React, { useState } from "react";
import TopicDetail from "./TopicDetail";

const all = [
  {
    nu1: [
      { nui: "value1" },
      { nui: "value2" },
      { nui: "value1" },
      { nui: "value2" },
      { nui: "value1" },
      { nui: "value2" }
    ]
  },
  {
    nu2: [
      { nui: "value1" },
      { nui: "value2" }
    ]
  },
  {
    nu3: [
      { nui: "value1" },
      { nui: "value2" }
    ]
  },
  {
    nu4: [
      { nui: "value1" },
      { nui: "value2" }
    ]
  }
];

const SubHomeContent = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClickTopic = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const activeItem = activeIndex !== null ? all[activeIndex] : null;
  const activeKey = activeItem ? Object.keys(activeItem)[0] : null;
  const dataToShow = activeItem && activeKey
    ? { [activeKey]: activeItem[activeKey as keyof typeof activeItem] ?? [] }
    : null;

  return (
    <div className="max-w-4xl flex flex-row gap-6">
      {/* Left column: topic list */}
      <div className="w-1/3 bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Topics</h2>
        {all.map((item, index) => (
          <div key={index}>
            <p
              className={`m-2 px-3 py-2 rounded cursor-pointer ${
                activeIndex === index ? "bg-amber-200" : "bg-gray-300 hover:bg-amber-100"
              }`}
              onClick={() => handleClickTopic(index)}
            >
              {Object.keys(item)[0]}
            </p>
          </div>
        ))}
      </div>

      {/* Right column: detail view */}
      <div className="w-2/3 bg-white p-4 rounded border">
        {dataToShow ? (
          <TopicDetail dataToShow={dataToShow} />
        ) : (
          <p className="text-gray-500">click</p>
        )}
      </div>
    </div>
  );
};

export default SubHomeContent;
