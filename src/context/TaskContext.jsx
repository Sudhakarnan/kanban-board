import React, { createContext, useContext, useEffect, useState } from "react";
import { getTasksFromStorage, setTasksToStorage } from "../utils/storage";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const defaultTasks = [
  {
    id: "1",
    title: "Sample Task",
    description: "This is just a sample.",
    status: "todo",
    tags: ["Sample"],
    priority: "Medium",
    color: "#a5b4fc",
    favorite: false,
    checklist: [
      { text: "Try checklist", done: false },
      { text: "Try delete", done: false },
    ],
    archived: false
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => getTasksFromStorage() || defaultTasks);
  const [modalTask, setModalTask] = useState(null);
  const [deleteModalTask, setDeleteModalTask] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [...prev, task]);
  const updateTask = (id, data) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  // For checklists
  const toggleChecklist = (taskId, idx) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              checklist: t.checklist.map((item, i) =>
                i === idx ? { ...item, done: !item.done } : item
              ),
            }
          : t
      )
    );
  };

  // Archive
  const archiveTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, archived: true } : t))
    );
  const restoreTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, archived: false } : t))
    );

  // Star
  const toggleFavorite = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        modalTask,
        setModalTask,
        setTasks,
        deleteModalTask,
        setDeleteModalTask,
        search,
        setSearch,
        toggleChecklist,
        archiveTask,
        restoreTask,
        toggleFavorite
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
