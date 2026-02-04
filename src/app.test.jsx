import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { addTask, deleteTask, moveTask, resetTasks, nextStatus } from "./tasks";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  // ===== App Integration Tests =====
  it("renders the app title", () => {
    render(<App />);
    expect(screen.getByText(/work tracker/i)).toBeInTheDocument();
  });

  it("loads tasks from localStorage on start", () => {
    const seed = [{ id: 1, title: "Seed task", status: "backlog" }];
    localStorage.setItem("work-tracker.tasks", JSON.stringify(seed));

    render(<App />);
    expect(screen.getByText("Seed task")).toBeInTheDocument();
  });

  it("saves tasks to localStorage after adding a task", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<App />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("New task title..."),
      "My task"
    );
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(setItemSpy).toHaveBeenCalled();
  });

  it("clears tasks after clicking Reset", async () => {
    localStorage.setItem(
      "work-tracker.tasks",
      JSON.stringify([{ id: 1, title: "Seed task", status: "backlog" }])
    );

    render(<App />);
    expect(screen.getByText("Seed task")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.queryByText("Seed task")).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("work-tracker.tasks"))).toEqual([]);
  });

  it("moves task between columns", async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("New task title..."), "Move me");
    await user.click(screen.getByRole("button", { name: "Add" }));

    // Task should be in Backlog
    expect(screen.getByText("Move me")).toBeInTheDocument();

    // Click Move button
    await user.click(screen.getByRole("button", { name: "Move" }));

    // Task should move to In Progress (emoji change)
    expect(screen.getByText("Move me")).toBeInTheDocument();
  });
});

describe("tasks helpers", () => {
  it("addTask adds a task", () => {
    vi.spyOn(Date, "now").mockReturnValue(123);
    const out = addTask([], "Hello");
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      id: 123,
      title: "Hello",
      status: "backlog",
    });
  });

  it("addTask ignores empty title", () => {
    const out = addTask([{ id: 1 }], "");
    expect(out).toHaveLength(1);
  });

  it("deleteTask removes by id", () => {
    const tasks = [{ id: 1, title: "A" }, { id: 2, title: "B" }];
    const out = deleteTask(tasks, 1);
    expect(out).toEqual([{ id: 2, title: "B" }]);
  });

  it("moveTask advances status", () => {
    const tasks = [{ id: 1, title: "Test", status: "backlog" }];
    const out = moveTask(tasks, 1);
    expect(out[0].status).toBe("in_progress");
  });

  it("moveTask from done stays in done", () => {
    const tasks = [{ id: 1, title: "Test", status: "done" }];
    const out = moveTask(tasks, 1);
    expect(out[0].status).toBe("done");
  });

  it("nextStatus cycles correctly", () => {
    expect(nextStatus("backlog")).toBe("in_progress");
    expect(nextStatus("in_progress")).toBe("done");
    expect(nextStatus("done")).toBe("done");
    expect(nextStatus("unknown")).toBe("backlog");
  });

  it("resetTasks returns empty array", () => {
    expect(resetTasks()).toEqual([]);
  });
});
