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

  const handleUpdateTaskListName = (taskListId, newName) => {
    setTaskLists(prevTaskLists =>
      prevTaskLists.map(taskList =>
        taskList.id === taskListId ? { ...taskList, name: newName } : taskList
      )
    );
    if (selectedTaskListId === taskListId) {
      setSelectedTaskListName(newName);
    }
  };

  const handleSelectTaskList = (taskListId) => {
    setSelectedTaskListId(taskListId);
    const selectedList = taskLists.find(list => list.id === taskListId);
    setSelectedTaskListName(selectedList ? selectedList.name : '');
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col text-white">
      {/* <Navbar /> */}
        <nav className="bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
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
            <img src={gearIcon} alt="David Mostoller Portfolio" style={{width: "40px"}} />
          </a>
          <div className="absolute top-full right-1 mt-2 mr-0 hidden group-hover:block bg-black text-white text-sm rounded py-4 px-4">
            Portfolio
          </div>
        </div>    
      </nav>
      <div className="mx-auto p-4 flex-grow flex flex-col items-center">

        <div className="container flex gap-4">
          <div className="left-column flex-grow">
            <TaskList
              onSelect={handleSelectTaskList}
              selectedTaskListId={selectedTaskListId}
              onUpdateTaskListName={handleUpdateTaskListName}
              setSelectedTaskListName={setSelectedTaskListName}
              setSearchQuery={setSearchQuery}
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