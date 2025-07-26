import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function Board() {
  const { tasks, setTasks, search } = useTasks();

  const filtered = tasks.filter(
    (t) =>
      !t.archived &&
      (
        t.title.toLowerCase() +
        " " +
        t.description.toLowerCase() +
        " " +
        (t.tags ? t.tags.join(" ") : "")
      ).includes(search.toLowerCase())
  );

  const getColumnTasks = (colId) =>
    filtered.filter((t) => t.status === colId);

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find source/dest column tasks
    const sourceTasks = getColumnTasks(source.droppableId);
    const destTasks = getColumnTasks(destination.droppableId);

    const movedTask = sourceTasks[source.index];

    // Remove from source
    let newSourceTasks = [...sourceTasks];
    newSourceTasks.splice(source.index, 1);

    // Insert into destination
    let newDestTasks = [...destTasks];
    newDestTasks.splice(destination.index, 0, {
      ...movedTask,
      status: destination.droppableId,
    });

    // Build new tasks array preserving order for each column
    let newTasks = [];
    columns.forEach((col) => {
      if (col.id === source.droppableId && col.id === destination.droppableId) {
        newTasks = newTasks.concat(newDestTasks);
      } else if (col.id === source.droppableId) {
        newTasks = newTasks.concat(newSourceTasks);
      } else if (col.id === destination.droppableId) {
        newTasks = newTasks.concat(newDestTasks);
      } else {
        newTasks = newTasks.concat(getColumnTasks(col.id));
      }
    });

    // Add archived and filtered-out tasks at the end
    newTasks = newTasks.concat(
      tasks.filter((t) => t.archived || !filtered.includes(t))
    );

    setTasks(newTasks);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {columns.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={getColumnTasks(col.id)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
