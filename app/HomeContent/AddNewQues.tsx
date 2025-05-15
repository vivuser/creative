"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddNewQues = () => {
  const router = useRouter()
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    console.log('Submitting question:', question);
    // Add your submission logic here (API call, etc.)
    
    setTimeout(() => {
      setQuestion('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleRedirect = () => {
    router.push('/SubHomeContent')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="question" className="block text-lg font-medium text-gray-700">
          lloerehej
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="sdjksjdh fsdhfkjhsd..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!question.trim() || isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              !question.trim() || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'dhdkjsfjk'}
          </button>
        </div>
      </form>
      
      {/* Character counter */}
      <div className="text-sm text-gray-500 mt-1">
        {question.length}/250 characters
      </div>


     <button 
     onClick={handleRedirect}
     className='bg-yellow-100 p-2 rounded-2xl text-xs my-4'
     >
        Visit SubHomeContent
     </button>

    </div>
  );
};

export default AddNewQues;