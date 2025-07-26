import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function ArchivePanel() {
  const { tasks, restoreTask, setModalTask } = useTasks();
  const archived = tasks.filter(t => t.archived);

  const [show, setShow] = useState(false);
  if (!archived.length) return null;
  return (
    <div className="mt-5 mb-2 max-w-2xl mx-auto">
      <button
        className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded shadow mb-2"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"} Archived Tasks ({archived.length})
      </button>
      {show && (
        <div className="bg-white rounded-xl shadow px-3 py-3">
          {archived.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between border-b last:border-b-0 py-2"
            >
              <div
                className="font-semibold text-gray-700 cursor-pointer"
                onClick={() => setModalTask(t)}
              >
                {t.title}
              </div>
              <button
                className="bg-yellow-100 hover:bg-yellow-300 px-3 py-1 rounded"
                onClick={() => restoreTask(t.id)}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ArchivePanel;
