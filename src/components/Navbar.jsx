import React from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import gearIcon from '../assets/gear.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center">
      <ClipboardDocumentListIcon className="h-8 w-8 text-white" />
      <h1 className="text-3xl font-bold">TaskMaster</h1>
      </div>

      <div className="relative group">
        <a href="https://davidmostoller.com" target='_blank' className="cursor-pointer">
          <img src={gearIcon} alt="David Mostoller Portfolio" style={{width: "40px"}} />
        </a>
        <div className="absolute top-full right-1 mt-2 mr-0 hidden group-hover:block bg-black text-white text-sm rounded py-4 px-4">
          Portfolio
        </div>
      </div>    
    </nav>
  );
};

export default Navbar;