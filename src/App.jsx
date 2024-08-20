import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import Task from './components/Task';
import Search from './components/Search';
import Footer from './components/Footer';
import axios from 'axios';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import gearIcon from './assets/gear.svg';

function App() {
  const [selectedTaskListId, setSelectedTaskListId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [taskLists, setTaskLists] = useState([]);
  const [selectedTaskListName, setSelectedTaskListName] = useState('');

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    const response = await axios.get('/api/tasklists/');
    setTaskLists(response.data);
  };


  const handleSelectTaskList = (taskListId) => {
    setSelectedTaskListId(taskListId);
    const selectedList = taskLists.find(list => list.id === taskListId);
    setSelectedTaskListName(selectedList ? selectedList.name : '');
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col text-white">
        <nav className="bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
        <ClipboardDocumentListIcon className="h-8 w-8 text-white"/>
        </div>
        {selectedTaskListId ?
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            :
            <h1 className="text-3xl font-bold">TaskMaster</h1>
            }
        <div className="relative group">
          <a href="https://davidmostoller.com" target='_blank' className="cursor-pointer">
            <img src={gearIcon} alt="David Mostoller Portfolio" style={{width: "35px"}} />
          </a>
          <div className="absolute top-full right-1 mt-2 mr-0 hidden group-hover:block bg-black text-white text-sm rounded py-4 px-4">
            Portfolio
          </div>
        </div>    
      </nav>
      <div className="mx-auto p-4 flex-grow flex flex-col items-center mt-16">
        <div className="container flex flex-col md:flex-row gap-4">
          <div className="left-column flex-grow">
            <TaskList
              onSelect={handleSelectTaskList}
              selectedTaskListId={selectedTaskListId}
              setSelectedTaskListName={setSelectedTaskListName}
              setSearchQuery={setSearchQuery}
              taskLists={taskLists}
              setTaskLists={setTaskLists}
            />

          </div>
          <div className="right-column flex-grow">
            {selectedTaskListId && (
              <Task
                taskListId={selectedTaskListId}
                searchQuery={searchQuery}
                taskListName={selectedTaskListName}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;