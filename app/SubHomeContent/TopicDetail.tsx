interface TopicDetailProps {
  dataToShow: {
    [key: string]: {
      nui: string;
    }[];
  };
}

  
  const TopicDetail = ({ dataToShow }: TopicDetailProps) => {
    const key = Object.keys(dataToShow)[0];
    const values = dataToShow[key];
  
    return (
      <div className="bg-gray-100 p-4 m-2 border rounded">
        <h2 className="font-bold">{key}</h2>
        {values.map((item, idx) => (
          <p key={idx}>{item.nui}</p>
        ))}
      </div>
    );
  };



  export default TopicDetail;
  