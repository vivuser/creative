"use client"
import { MOCK_QUESTIONS_DB } from '@/app/api/check-similar-questions/route'
import React, { useEffect, useState } from 'react'

const SingleQuestion = ({
  params,
} : {
  params: { id : string}
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = MOCK_QUESTIONS_DB.find(q => q.id === params.id) || 
        { id: params.id, text: "Question not found", content: null };

  useEffect(() => {
    const fetchTags = async () => {
      if (!question.text || question.text === "Question not found") return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/get-relevant-tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: question.text }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }

        const data = await response.json();
        setTags(data.map((tag: any) => tag.name)); // Adjust based on your API response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [question.text]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{question.text}</h1>
      {question.content ? (
        <p className="mt-4 text-gray-700">{question.content}</p>
      ) : (
        <p className="mt-4 text-gray-500">No additional content available.</p>
      )}
      
      {/* Display tags */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Relevant Tags</h2>
        {loading ? (
          <p>Loading tags...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tags found for this question</p>
        )}
      </div>
    </div>
  );
}

export default SingleQuestion;