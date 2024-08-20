import React from 'react';
import { FaReact, FaCss3Alt } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8 shadow-lg flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <FaReact className="h-8 w-8 text-blue-500" />
        <FaCss3Alt className="h-8 w-8 text-blue-700" />
        <SiDjango className="h-8 w-8 text-green-500" />
      </div>
      <p className="text-md mb-1">Created by David Mostoller</p>
        <p className="text-xs mb-4 mt-0">Powered by React, Tailwind CSS, and Django</p>
    </footer>
  );
};

export default Footer;