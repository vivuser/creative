interface ValueData {
    detail: string;
    uv: number;
    dv: number;
    hc: number;
    c: string[];
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
        <p className="bg-blue-50 p-2 h-20 rounded-2xl"><strong></strong> {valueData.detail}</p>
        
        <span className="flex flex-row">
        <p className="bg-pink-50 rounded-4xl mx-2 p-1"><strong>uv</strong> {valueData.uv}</p>
        <p className="bg-pink-50 rounded-4xl mx-2 p-1"><strong>dv</strong> {valueData.dv}</p>
        <p className="bg-pink-50 rounded-4xl mx-2 p-1"><strong>hc</strong> {valueData.hc}</p>
        </span>

        {valueData.c && valueData.c.length > 0 && (
          <div className="mt-2">
            <strong>Comments</strong>
            <ul className="list-disc ml-5">
              {valueData.c.map((comment, idx) => (
                <li key={idx}>{comment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default AnswerDetail;