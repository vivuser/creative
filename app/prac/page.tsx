"use client"
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react'

interface Task {
    id: number;
    title: string;
    done: boolean;
}

const Prac = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEdit, setIsEdit] = useState<{ [id: number] : boolean }>({})

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks){
        setTasks(JSON.parse(storedTasks));
    }
  },[])
  
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setTask(e.target.value)
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  },[tasks])

  const handleAddNew = () =>{
    if (task.trim() === "") return;

    const newTask: Task = {
        id: Date.now(),
        title: task,
        done: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask ]);
    setTask("")
  };

  const toggleTaskDone = (id: number) => {
        setTasks((prevTasks) => 
            prevTasks.map(t => 
                t.id ===id ? {...t, done: !t.done} : t
            )    
        )
  };

  const toggleEditMode = (id: number, val: boolean) => {
    setIsEdit(prev => ({ ...prev, [id] : val }));
  }

  const handleDeleteTask = (id: number) => {
      setTasks(tasks.filter(t => t.id !== id))
  };

  const handleEditTask =(id: number, newTitle: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? {...t, title: newTitle} : t)
    );
  };

  const handleSave = (id: number) => {
    setIsEdit(prev => ({ ...prev, [id]: false}));
  }

  const handleClearAll = () => {
    setTasks([]);
  }

  return (
    <div>
    <input className='border border-t-2' placeholder='EnterTask' onChange={handleChange} value={task}/>
    <button onClick={handleAddNew} className='bg-amber-200 p-1 rounded-xl'>Add new</button>
    All tasks  

    <button className='bg-gray-100 p-2 rounded-xl hover:bg-amber-50' onClick={handleClearAll}>Clear all task</button>
    <ul>
    {tasks.map((t,index) => 
         <li key={index}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTaskDone(t.id)}
            />            
            <span className={t.done ? "line-through text-gray-400" : ""}>
                <div className='flex flex-row'>
                {isEdit[t.id] ? 
                <input type='text' value={t.title} onChange={(e) => handleEditTask(t.id, e.target.value)} autoFocus/>
                :
                <span className='w-64 truncate'>{t.title} </span> 
                }
                {
                  isEdit[t.id] ?
                  <button className='bg-amber-100 p-1 rounded-xl' onClick={()=>handleSave(t.id)}>Save</button>
                  :
                  <PencilIcon className='w-5 h-5 text-blue-500 hover:text-blue-700' onClick={()=> toggleEditMode(t.id, true)}/>
                  }
                <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" onClick={()=>handleDeleteTask(t.id)}/>
                </div>
            </span>
            </li>
    )}
    </ul>
    </div>
  )
}

export default Prac