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

interface TopicDetailProps {
  dataToShow: {
    [key: string]: TopicItem[];
  };
  onShowAnswer: (data: any) => void;
}

const TopicDetail = ({ dataToShow, onShowAnswer }: TopicDetailProps) => {
  const topicKey = Object.keys(dataToShow)[0];
  const items = dataToShow[topicKey];

  return (
    <div className="bg-gray-100 p-4 m-2 border rounded">
      <h2 className="font-bold">{topicKey}</h2>
      {items.map((item, idx) => {
        const valueKey = Object.keys(item.nui)[0];
        return (
          <div key={idx} className="text-sm m-2 flex flex-col">
            <div className="bg-green-100 inline-block px-2 py-1 rounded mr-2">
              {topicKey}
            </div>
            <span
              className="bg-yellow-100 inline-block px-2 py-1 rounded cursor-pointer"
              onClick={() => onShowAnswer(item.nui)}
            >
              {valueKey}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TopicDetail