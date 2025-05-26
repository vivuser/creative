import { MOCK_QUESTIONS_DB } from '@/app/api/check-similar-questions/route'
import React from 'react'

const singleQuestion = ({
  params,
} : {
  params: { id : string}
}) => {

  const question = MOCK_QUESTIONS_DB.find(q => q.id === params.id) || 
        { id: params.id, text: "Question not found", content: null };

        return (
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold">{question.text}</h1>
            {question.content ? (
              <p className="mt-4 text-gray-700">{question.content}</p>
            ) : (
              <p className="mt-4 text-gray-500">No additional content available.</p>
            )}
          </div>
        );
}

export default singleQuestion