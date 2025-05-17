import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative mt-6 w-full max-w-lg">
      {/* Contenedor del campo de búsqueda */}
      <div className="flex items-center bg-white border-2 border-[#c4c4c4] rounded-full focus-within:border-blue-500 p-2">
        {/* Icono de búsqueda (rosado) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-pink-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
        {/* Campo de búsqueda */}
        <input
          type="text"
          className="w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none pl-2"
          placeholder="Busca una titulación"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
