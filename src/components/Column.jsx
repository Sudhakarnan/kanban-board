import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function Column({ column, tasks }) {
  return (
    <div className="flex-1 flex flex-col min-w-[90vw] sm:min-w-[320px] md:min-w-[340px] bg-white bg-opacity-80 backdrop-blur rounded-2xl shadow-lg px-2 py-3">
      <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-700 flex items-center gap-1">
        {column.title}
        <span className="bg-gray-200 text-xs font-bold ml-2 px-2 py-0.5 rounded-full text-purple-600">{tasks.length}</span>
      </h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[100px] transition-colors duration-200 space-y-4 px-1 pb-2 ${snapshot.isDraggingOver ? "bg-gradient-to-b from-purple-100/70 to-pink-100/60" : ""}`}
          >
            {tasks.length === 0 && (
              <div className="text-gray-400 text-sm text-center py-5">No tasks here</div>
            )}
            {tasks.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
