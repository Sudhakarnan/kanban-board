import React from "react";
import { useTasks } from "../context/TaskContext";

function SearchBar() {
  const { search, setSearch } = useTasks();
  return (
    <div className="flex items-center gap-2 bg-white shadow rounded-xl px-3 py-2 mt-2 mb-4">
      <input
        className="w-full px-2 py-1 rounded outline-none"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <span className="text-gray-400 material-icons">search</span>
    </div>
  );
}
export default SearchBar;
