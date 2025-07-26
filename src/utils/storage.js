const TASKS_KEY = "kanban-tasks";

export function getTasksFromStorage() {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setTasksToStorage(tasks) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {}
}
