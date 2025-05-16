"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddNewQues = () => {
  const router = useRouter()
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [showSimilarQuestions, setShowSimilarQuestions] = useState(false);

  const checkSimilarQuestions = async (query: string) => {
    try {
      const response = await fetch('/api/check-similar-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
  
      const text = await response.text(); // First get as text
      try {
        return JSON.parse(text); // Then try to parse
      } catch (e) {
        console.error('Received non-JSON response:', text);
        throw new Error(`API returned invalid JSON: ${text.slice(0, 100)}...`);
      }
    } catch (error) {
      console.error('Full API error:', error);
      throw error;
    }
  };
  
  // Usage in handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await checkSimilarQuestions(question);
      console.log('Similar questions:', results);
    } catch (error) {
      // Show user-friendly error
      alert('Failed to check questions. Please try again.');
    }
  };



  const handleRedirect = () => {
    router.push('/SubHomeContent')
  }

  const proceedWithSubmission = async () => {
    setShowSimilarQuestions(false);
    setIsSubmitting(true);
    
    console.log('Submitting question after similar check:', question);
    // Add your submission logic here (API call, etc.)
    
    setTimeout(() => {
      setQuestion('');
      setIsSubmitting(false);
    }, 1000);
  };

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
            maxLength={250}
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

      {/* Similar questions modal */}
      {showSimilarQuestions && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800">Similar questions found:</h3>
          <ul className="mt-2 space-y-2">
            {similarQuestions.map((q, i) => (
              <li key={i} className="text-gray-600">• {q}</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShowSimilarQuestions(false)}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={proceedWithSubmission}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post Anyway
            </button>
          </div>
        </div>
      )}

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