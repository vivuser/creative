"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Question {
  id: string;
  text: string;
  content?:string;
  tags: string[]
}

const AddNewQues = () => {
  const router = useRouter()
  const [question, setQuestion] = useState('');
  const [ debouncedQuestion ] = useDebounce(question, 500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<Question[]>([]);
  const [showSimilarQuestions, setShowSimilarQuestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Question[]>([])
  const [isLoading,setIsLoading] = useState(false);


  useEffect(() => {
    if (debouncedQuestion.trim().length > 2) {
      fetchSuggestions(debouncedQuestion);
    } else{
      setSuggestions([]);
    }
  }, [debouncedQuestion]);


  const fetchSuggestions = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/check-similar-questions', {
        method: 'POST',
        body: JSON.stringify({ question: query }),
      });
      const { similarQuestions } = await res.json();
      setSuggestions(similarQuestions || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

    // Render suggestions below input
    const showSuggestions = question.trim().length > 0 && suggestions.length > 0;

  
  // Usage in handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const { similarQuestions } = await checkSimilarQuestions(question);

      if (similarQuestions && similarQuestions.length > 0) {
        setSimilarQuestions(similarQuestions);
        setShowSimilarQuestions(true);
      }

    } catch (error) {
      // Show user-friendly error
      alert('Failed to check questions. Please try again.');
    }
  };

  console.log(similarQuestions, 'simii  questtttt')


  const handleRedirect = () => {
    router.push('/SubHomeContent')
  }

  const proceedWithSubmission = async () => {
    setShowSimilarQuestions(false);
    setIsSubmitting(true);
    
    console.log('Submitting question after similar check:', question);
    // Add your submission logic here (API call, etc.)

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      console.log(data, 'daaaaas')

      if (!response.ok) throw new Error ('Failed to save')


      setQuestion('');

      router.refresh();
    } catch (error) {
      alert('Failed to save. Please try again')
    }


    setTimeout(() => {
      setQuestion('');
      setIsSubmitting(false);
    }, 1000);
  };

  console.log(similarQuestions, 'similar 123...')

  const handleQuesRedirect = (id: string) => {
    router.push(`/singleQuestion/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="question" className="block text-lg font-medium text-gray-700">
          search
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="search..."
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
            {isSubmitting ? 'Posting...' : 'go'}
          </button>
        </div>
      </form>
      
      {/* Character counter */}
      <div className="text-sm text-gray-500 mt-1">
        {question.length}/250 characters
      </div>


      {suggestions.map((q) => (
          <div 
            key={q.id}
            className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between"
            onClick={() => router.push(`/questions/${q.id}`)}
          >
            <span>{q.text}</span>
            <span className="text-xs text-gray-500">Jump →</span>
          </div>
        ))}



      {/* Similar questions modal */}
      {showSimilarQuestions && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800">Similar questions found:</h3>
          <ul className="mt-2 space-y-2">
            {similarQuestions.map((q, i) => (
              <li key={i} className="text-gray-600">• {q.text}
            <button className='ml-4 bg-amber-100 rounded-sm px-2 py-1' onClick={()=>handleQuesRedirect(q.id)} >
            Visit
            </button>
              </li>
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