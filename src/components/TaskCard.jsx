import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTasks } from "../context/TaskContext";
import clsx from "clsx";

function TaskCard({ task, index }) {
  const { setModalTask, setDeleteModalTask, toggleFavorite } = useTasks();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => setModalTask(task)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "relative p-4 rounded-xl shadow-md cursor-pointer border-l-4 group bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl",
            {
              "border-blue-400": task.status === "todo",
              "border-yellow-400": task.status === "inprogress",
              "border-green-400": task.status === "done",
              "opacity-95": snapshot.isDragging,
              "ring-2 ring-purple-300": snapshot.isDragging,
            }
          )}
          style={{
            borderLeftColor: task.color || undefined,
            background: task.color
              ? `linear-gradient(95deg,${task.color}22 60%,#fff 100%)`
              : undefined,
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              {task.color && (
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ background: task.color, border: "1.5px solid #fff" }}
                />
              )}
              <h3 className="font-semibold text-base md:text-lg text-gray-800 truncate">
                {task.title}
              </h3>
              {task.favorite && (
                <span
                  className="text-yellow-500 ml-2"
                  title="Starred"
                  style={{fontSize: "1.2em"}}
                >★</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-yellow-400 text-xl opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(task.id);
                }}
                title="Star/Unstar"
              >★</button>
              <button
                className="text-red-500 text-xs hover:underline ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteModalTask(task);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-gradient-to-tr from-blue-200 to-purple-200 rounded px-2 text-xs text-purple-800"
              >
                {tag}
              </span>
            ))}
          </div>
          {task.priority && (
            <div className="text-xs text-right mt-2">
              <span
                className={clsx("py-0.5 px-2 rounded", {
                  "bg-red-200 text-red-800": task.priority === "High",
                  "bg-yellow-200 text-yellow-800": task.priority === "Medium",
                  "bg-green-200 text-green-800": task.priority === "Low",
                })}
              >
                {task.priority}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
