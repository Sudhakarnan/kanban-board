import React from "react";
import { useTasks } from "../context/TaskContext";

function DeleteConfirmModal() {
  const { deleteModalTask, setDeleteModalTask, deleteTask } = useTasks();

  if (!deleteModalTask) return null;

  function confirmDelete() {
    deleteTask(deleteModalTask.id);
    setDeleteModalTask(null);
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[92vw] max-w-xs p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
          onClick={() => setDeleteModalTask(null)}
        >
          ×
        </button>
        <h2 className="font-bold text-lg mb-2 text-purple-700">Delete Task?</h2>
        <div className="text-gray-700 mb-4">
          Are you sure you want to delete &quot;{deleteModalTask.title}&quot;?
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1 font-bold shadow"
            onClick={confirmDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
            onClick={() => setDeleteModalTask(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
