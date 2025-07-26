import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const emptyForm = {
  title: "",
  description: "",
  status: "todo",
  tags: "",
  priority: "Medium",
};

function TaskForm() {
  const [form, setForm] = useState(emptyForm);
  const { addTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    addTask({
      ...form,
      id: Date.now().toString(),
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    });
    setForm(emptyForm);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 rounded-2xl shadow-md p-4 flex flex-col md:flex-row md:items-end gap-3 max-w-3xl mx-auto mt-2"
    >
      <input
        className="border focus:border-purple-400 rounded px-2 py-2 flex-1 min-w-0"
        required
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border focus:border-purple-400 rounded px-2 py-2 flex-1 min-w-0"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="border focus:border-purple-400 rounded px-2 py-2 w-full md:w-36"
        placeholder="Tags (comma, separated)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />
      <select
        className="border focus:border-purple-400 rounded px-2 py-2"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-tr from-purple-500 to-blue-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-5 py-2 rounded-xl shadow transition-all duration-200"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
