const STATUSES = ["backlog", "in_progress", "done"];

export function nextStatus(status) {
  const idx = STATUSES.indexOf(status);
  if (idx === -1) return "backlog";
  return STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
}

export function addTask(tasks, title) {
  const clean = title.trim();
  if (!clean) return tasks;

  const newTask = {
    id: Date.now(),
    title: clean,
    status: "backlog",
  };

  return [...tasks, newTask];
}

export function moveTask(tasks, id) {
  return tasks.map((t) =>
    t.id === id ? { ...t, status: nextStatus(t.status) } : t
  );
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function resetTasks() {
  return [];
}
