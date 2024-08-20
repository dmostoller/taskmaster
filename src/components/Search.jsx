import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-1/2 bg-gray-900 text-white p-0 rounded-lg shadow-lg mt-0 mb-0 max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="bg-gray-800 text-white p-2 rounded w-full"
      />
    </div>
  );
};

export default Search;