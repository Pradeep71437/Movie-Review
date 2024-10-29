// src/components/Search.jsx
import React from 'react';

const Search = ({ query, setQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

export default Search;
