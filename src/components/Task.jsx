import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, deleteTask, fetchTaskLists, markTaskComplete, markTaskIncomplete } from '../api';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Task = ({ taskListId, searchQuery, taskListName }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    if (taskListId) {
      fetchTasks(taskListId).then(response => setTasks(response.data));
    }
  }, [taskListId]);

  const handleCreateTask = () => {
    createTask(taskListId, { title: newTaskTitle }).then(response => {
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskListId, taskId).then(() => {
      setTasks(tasks.filter(t => t.id !== taskId));
    });
  };

  const handleMarkComplete = (taskId) => {
    markTaskComplete(taskListId, taskId).then(response => {
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
    });
  };

  const handleMarkIncomplete = (taskId) => {
    markTaskIncomplete(taskListId, taskId).then(response => {
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
    });
  };


  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedTasks = [...filteredTasks].sort((a, b) => a.completed - b.completed);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{taskListName}</h2>
      <ul className="mb-4">
        {sortedTasks.map(task => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 rounded ${task.completed ? 'bg-gray-800 text-gray-500' : ''}`}>
            <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
            {task.completed ? (
              <button
                onClick={() => handleMarkIncomplete(task.id)}
                className="text-violet-500 hover:text-violet-700 ml-2">
                Mark Incomplete
              </button>
            ) : (
              <button
                onClick={() => handleMarkComplete(task.id)}
                className="text-teal-500 hover:text-teal-700 ml-2">
                Mark Complete
              </button>
              
            )}
              <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700 ml-2">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task"
          className="bg-gray-800 text-white p-2 rounded mr-2 flex-grow"/>
        <button
          onClick={handleCreateTask}
          className="border border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Task;