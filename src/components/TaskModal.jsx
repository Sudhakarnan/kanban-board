import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import clsx from "clsx";

const priorities = ["High", "Medium", "Low"];
const statuses = [
    { value: "todo", label: "To Do" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
];
const colorOptions = [
    "#fca5a5", "#fdba74", "#fde68a", "#bbf7d0", "#a5b4fc", "#f9a8d4"
];

function TaskModal() {
    const {
        modalTask,
        setModalTask,
        updateTask,
        toggleChecklist,
        archiveTask,
        restoreTask,
        toggleFavorite,
    } = useTasks();
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(modalTask || {});

    useEffect(() => {
        if (modalTask) {
            setForm({
                ...modalTask,
                tags: Array.isArray(modalTask.tags) ? modalTask.tags.join(", ") : modalTask.tags,
            });
        }
        setEdit(false);
    }, [modalTask]);

    if (!modalTask) return null;

    function handleSave() {
        updateTask(modalTask.id, {
            ...form,
            tags:
                typeof form.tags === "string"
                    ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
                    : [],
            checklist: form.checklist || []
        });
        setEdit(false);
        setModalTask(null);
    }

    function addChecklistItem() {
        setForm((prev) => ({
            ...prev,
            checklist: [...(prev.checklist || []), { text: "", done: false }],
        }));
    }

    function updateChecklist(idx, value) {
        setForm((prev) => ({
            ...prev,
            checklist: prev.checklist.map((item, i) =>
                i === idx ? { ...item, text: value } : item
            ),
        }));
    }

    function removeChecklistItem(idx) {
        setForm((prev) => ({
            ...prev,
            checklist: prev.checklist.filter((_, i) => i !== idx),
        }));
    }

    function toggleChecklistItem(idx) {
        toggleChecklist(modalTask.id, idx);
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center animate-fade-in">
            <div
                className="bg-white rounded-2xl shadow-2xl w-[98vw] max-w-md p-6 relative animate-fade-up"
                style={{
                    borderTop: `8px solid ${modalTask.color || "#a5b4fc"}`,
                    background: modalTask.color
                        ? `linear-gradient(95deg,${modalTask.color}2 80%,#fff 100%)`
                        : undefined,
                }}
            >
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
                    onClick={() => setModalTask(null)}
                >
                    ×
                </button>
                {edit ? (
                    <>
                        <input
                            className="border rounded w-full mb-2 px-2 py-2 text-lg"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            placeholder="Task Title"
                        />
                        <textarea
                            className="border rounded w-full mb-2 px-2 py-2"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Description"
                        />
                        <input
                            className="border rounded w-full mb-2 px-2 py-2"
                            placeholder="Tags (comma, separated)"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        />
                        <div className="flex gap-2 mb-2">
                            <select
                                className="border rounded px-2 py-1 flex-1"
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            >
                                {priorities.map((p) => (
                                    <option key={p}>{p}</option>
                                ))}
                            </select>
                            <select
                                className="border rounded px-2 py-1 flex-1"
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                {statuses.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                            {/* Color */}
                            <div className="flex items-center gap-1">
                                {colorOptions.map((c) => (
                                    <button
                                        type="button"
                                        key={c}
                                        onClick={() => setForm({ ...form, color: c })}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${form.color === c ? "border-black scale-110" : "border-white"
                                            }`}
                                        style={{ background: c }}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Checklist */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm">Checklist</span>
                                <button
                                    type="button"
                                    className="bg-blue-100 px-2 rounded text-blue-800 text-xs"
                                    onClick={addChecklistItem}
                                >
                                    + Add Item
                                </button>
                            </div>
                            <div className="space-y-1">
                                {form.checklist?.map((item, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input
                                            className="flex-1 border rounded px-1 py-1 text-xs"
                                            value={item.text}
                                            onChange={(e) => updateChecklist(idx, e.target.value)}
                                            placeholder="Checklist item"
                                        />
                                        <button
                                            type="button"
                                            className="text-red-400 text-xl"
                                            onClick={() => removeChecklistItem(idx)}
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                className="bg-gradient-to-tr from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded px-4 py-1 font-bold shadow"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-bold text-2xl mb-1 text-purple-700">{modalTask.title}</h2>
                            <button
                                className={clsx(
                                    "text-2xl",
                                    modalTask.favorite ? "text-yellow-400" : "text-gray-400"
                                )}
                                onClick={() => toggleFavorite(modalTask.id)}
                                title="Star/Unstar"
                            >
                                ★
                            </button>
                        </div>
                        <p className="mb-2 text-gray-700">{modalTask.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {modalTask.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="bg-gradient-to-tr from-blue-200 to-purple-200 rounded px-2 text-xs text-purple-800"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 text-sm mb-4">
                            <span
                                className={clsx("py-0.5 px-2 rounded", {
                                    "bg-red-200 text-red-800": modalTask.priority === "High",
                                    "bg-yellow-200 text-yellow-800": modalTask.priority === "Medium",
                                    "bg-green-200 text-green-800": modalTask.priority === "Low",
                                })}
                            >
                                {modalTask.priority}
                            </span>
                            <span
                                className={clsx("py-0.5 px-2 rounded", {
                                    "bg-blue-200 text-blue-800": modalTask.status === "todo",
                                    "bg-yellow-200 text-yellow-800": modalTask.status === "inprogress",
                                    "bg-green-200 text-green-800": modalTask.status === "done",
                                })}
                            >
                                {
                                    statuses.find((s) => s.value === modalTask.status)?.label ||
                                    modalTask.status
                                }
                            </span>
                            {modalTask.color && (
                                <span
                                    className="inline-block w-5 h-5 rounded-full border"
                                    style={{ background: modalTask.color, borderColor: "#fff" }}
                                    title="Card color"
                                ></span>
                            )}
                        </div>
                        {/* Checklist */}
                        {modalTask.checklist && modalTask.checklist.length > 0 && (
                            <div className="mb-3">
                                <div className="font-semibold text-sm mb-1">Checklist</div>
                                <ul className="space-y-1">
                                    {modalTask.checklist.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => toggleChecklistItem(idx)}
                                                className="accent-purple-400 w-4 h-4"
                                            />
                                            <span className={clsx("text-xs", { "line-through text-gray-400": item.done, "text-gray-800": !item.done })}>
                                                {item.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            <button
                                className="bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white rounded px-5 py-2 font-bold shadow"
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </button>
                            {!modalTask.archived ? (
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
                                    onClick={() => archiveTask(modalTask.id)}
                                >
                                    Archive
                                </button>
                            ) : (
                                <button
                                    className="bg-yellow-200 hover:bg-yellow-300 rounded px-3 py-1"
                                    onClick={() => restoreTask(modalTask.id)}
                                >
                                    Restore
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TaskModal;
