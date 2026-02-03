import { useEffect, useState } from "react";
import "./App.css";
import { loadTasks, saveTasks, clearTasks } from "./storage";

// KROK 1: Definiujemy statuy (kolumny) dla taska
// Każdy task ma jeden z tych statusów
const STATUSES = ["backlog", "in_progress", "done"];

// KROK 2: Funkcja pomocnicza do przenoszenia taska do następnego statusu
// Jeśli task jest w "backlog", przechodzi do "in_progress"
// Jeśli jest w "in_progress", przechodzi do "done"
// Jeśli jest w "done", zostaje tam (nie można dalej)
const nextStatus = (status) => {
  const idx = STATUSES.indexOf(status);
  if (idx === -1) return "backlog";
  return STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
};

export default function App() {
  // KROK 3: Stan dla inputa (tekst wprowadzany przez użytkownika)
  const [title, setTitle] = useState("");

  // KROK 4: Stan dla listy tasków (tablica wszystkich tasków)
  const [tasks, setTasks] = useState(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // KROK 5: Funkcja do obsługi submitu formularza
  const handleSubmit = (e) => {
    // Zapobiegamy przeładowaniu strony (standardowe zachowanie <form>)
    e.preventDefault();

    // Sprawdzamy czy input nie jest pusty
    if (title.trim() === "") return;

    // Tworzymy nowy task
    const newTask = {
      id: Date.now(), // unikalny ID (bardzo prosty sposób)
      title: title.trim(), // usuwamy spacje z przodu i tyłu
      status: "backlog", // nowy task zawsze startuje w backlog
    };

    // Dodajemy task do listy (bez mutowania!) - używamy spread operator
    setTasks((prev) => [...prev, newTask]);

    // Czyścimy input po dodaniu
    setTitle("");
  };

  // KROK 6: Funkcja do przenoszenia taska (Move button)
  const moveTask = (id) => {
    // Przechodzę przez każdy task
    // Jeśli to ten task, zmieniam mu status na nextStatus
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: nextStatus(t.status) } : t
      )
    );
  };

  // KROK 7: Funkcja do usuwania taska (Delete button)
  const deleteTask = (id) => {
    // Filtruje taskami - zostawiam tylko te które NIE mają tego ID
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  
  const handleReset = () => {
    clearTasks();      // usuwa zapis z localStorage
    setTasks([]);      // czyści UI
    setTitle("");      // opcjonalnie czyści input
  };
  // KROK 8: Funkcja do renderowania jednej kolumny
  // Biorę title (np. "Backlog") i status (np. "backlog")
  // Filtruje taskami które mają ten status
  // Rysuję je jako listę z przyciskami Move i Delete
  const renderColumn = (title, status) => {
    // Pobieramy tylko taski które mają status == status parametru
    const columnTasks = tasks.filter((t) => t.status === status);

    return (
      <div className="column">
        <h2 className="columnTitle">{title}</h2>

        {columnTasks.length === 0 ? (
          // Jeśli kolumna jest pusta - pokazujemy tekst
          <p className="emptyColumn">No tasks</p>
        ) : (
          // Jeśli są taski - rysujemy je jako <li>
          <ul className="taskList">
            {columnTasks.map((task) => (
              <li key={task.id} className="taskCard">
                <div className="taskContent">
                  <span className="taskTitle">{task.title}</span>

                  <div className="taskButtons">
                    {/* Move button - jeśli task jest w "done", button jest disabled */}
                    <button
                      className="btn btnMove"
                      onClick={() => moveTask(task.id)}
                      disabled={task.status === "done"}
                    >
                      Move
                    </button>

                    {/* Delete button - zawsze aktywny */}
                    <button
                      className="btn btnDelete"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // KROK 9: Render całej aplikacji
  return (
    <div className="app">
      <h1>Work Tracker</h1>

      {/* Formularz do dodawania taska */}
      <form className="taskForm" onSubmit={handleSubmit}>
        <input
          className="taskInput"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
        />
        <button className="btn btnSubmit" type="submit">
          Add
        </button>
        <button className="btn btnReset" type="button"onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Tablica 3 kolumn (Backlog, In Progress, Done) */}
      <div className="board">
        {renderColumn("📋 Backlog", "backlog")}
        {renderColumn("⚙️ In Progress", "in_progress")}
        {renderColumn("✅ Done", "done")}
      </div>
    </div>
  );
}
