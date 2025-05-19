interface ValueData {
  question: string; // Replacing 'detail' with 'question'
  upvotes: number; // Replacing 'uv' with 'upvotes'
  downvotes: number; // Replacing 'dv' with 'downvotes'
  helpfulCount: number; // Replacing 'hc' with 'helpfulCount'
  comments: string[]; // Replacing 'c' with 'comments'
}

interface AnswerDetailProps {
  data: {
    [key: string]: ValueData;
  };
}

const AnswerDetail = ({ data }: AnswerDetailProps) => {
  const [valueKey, valueData] = Object.entries(data)[0];

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-bold mb-2">{valueKey}</h3>
      <p className="bg-blue-50 p-2 h-20 rounded-2xl">
        <strong>Question:</strong> {valueData.question}
      </p>

      <span className="flex flex-row">
        <p className="bg-pink-50 rounded-4xl mx-2 p-1">
          <strong>Upvotes:</strong> {valueData.upvotes}
        </p>
        <p className="bg-pink-50 rounded-4xl mx-2 p-1">
          <strong>Downvotes:</strong> {valueData.downvotes}
        </p>
        <p className="bg-pink-50 rounded-4xl mx-2 p-1">
          <strong>Helpful Count:</strong> {valueData.helpfulCount}
        </p>
      </span>

      {valueData.comments && valueData.comments.length > 0 && (
        <div className="mt-2">
          <strong>Comments</strong>
          <ul className="list-disc ml-5">
            {valueData.comments.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnswerDetail;