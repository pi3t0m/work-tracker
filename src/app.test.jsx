import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

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
});
