import React, { useState, useEffect } from 'react';
import { fetchTaskLists, createTaskList, deleteTaskList } from '../api';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import axios from 'axios';

const TaskList = ({ onSelect, selectedTaskListId, setSelectedTaskListName, setSearchQuery }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [editingTaskListId, setEditingTaskListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchTaskLists().then(response => setTaskLists(response.data));
  }, []);

  const handleCreateList = () => {
    createTaskList({ name: newListName }).then(response => {
      const newList = response.data;
      setTaskLists([...taskLists, newList]);
      setNewListName('');
      onSelect(newList.id);
      setSelectedTaskListName(newList.name);
    });
  };


  const handleDeleteList = (taskListId) => {
    deleteTaskList(taskListId).then(() => {
      setTaskLists(taskLists.filter(list => list.id !== taskListId));
      if (selectedTaskListId === taskListId) {
        onSelect(null);
      }
    });
  };

  const handleEditClick = (taskListId, currentName) => {
    setEditingTaskListId(taskListId);
    setNewName(currentName);
  };

  const handleSaveClick = async (taskListId, newName) => {
    await axios.patch(`/api/tasklists/${taskListId}/update_name/`, { name: newName });
    setEditingTaskListId(null);
    fetchTaskLists().then(response => setTaskLists(response.data));
    setSelectedTaskListName(newName);

  };

  const handleTaskListClick = (listId) => {
    onSelect(listId);
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Task Lists</h2>
      <ul className="mb-4">
        {taskLists.map(list => (
          <li
          key={list.id}
          className={`flex items-center justify-between p-2 hover:bg-gray-700 rounded ${selectedTaskListId === list.id ? 'bg-gray-700' : ''}`}>   
        {editingTaskListId === list.id ? (
            <div>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setSearchQuery('');
                }}
                className="bg-gray-800 text-white p-2 rounded"/>
              <button onClick={() => handleSaveClick(list.id, newName)} 
          className="border border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white font-bold ml-2 py-2 px-10 rounded">
                Save
              </button>
            </div>
          ) : (
            <>
            <span
              onClick={() => handleTaskListClick(list.id)}
              className="cursor-pointer flex-grow"
            >
              {list.name}
            </span>
            {selectedTaskListId == list.id && 
              <>
            <button onClick={() => handleEditClick(list.id, list.name)} className="text-violet-500 hover:text-violet-700 ml-2">
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDeleteList(list.id)}
            className="text-red-500 hover:text-red-700 ml-2">
            <XMarkIcon className="h-5 w-5" />
          </button>
          </>}
          </>
          )}
        </li>
      ))}
    </ul>
      <div className="flex items-center">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
          className="bg-gray-800 text-white p-2 rounded mr-2 flex-grow"/>
        <button
          onClick={handleCreateList}
          className="border border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded">
          Create List
        </button>
      </div>
    </div>
  );
};

export default TaskList;