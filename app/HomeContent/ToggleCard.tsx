"use client"
import React, { useCallback, useMemo, useRef, useState } from 'react'

const ToggleCard = () => {
  const [count, setCount] = useState(1)
  const [noOfClicks, setNoOfClicks] = useState(0)


  const prevCountRef = useRef<number | null>(null);

  const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));


  const handleButtonClick = useCallback(() => {
    setCount(prev => (prev + 1) * prev)  
    setNoOfClicks(prev => prev + 1)  
  },[])

  React.useEffect(() => {
    prevCountRef.current = count
  },[count])


  const factorial = useMemo(() => fact(count), [count]);


  return (
    <div>ToggleCard {count}
    factorial { factorial }
    <div>Previous Count: {prevCountRef.current ?? "N/A"}</div>
    <div>
    <button
    onClick={handleButtonClick}
    className='p-2 rounded-2xl bg-green-200'
    >
     . click . 
    </button>
    </div>
    No of Clicks {noOfClicks}

    </div>
  )
}

export default ToggleCard