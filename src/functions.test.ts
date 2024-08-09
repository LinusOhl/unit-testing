import { describe, it, expect } from "vitest";
import { Todo } from "./types/Todo";
import { addTodo, toggleTodo, deleteTodo } from "./functions";

describe("add todo", () => {
  it("should add a todo", () => {
    const todos: Todo[] = [];
    const result = addTodo("This is a todo.", todos);
    const todo = todos[0];

    expect(result.success).toBeTruthy();
    expect(todos.length).toBe(1);
    expect(todos).toContainEqual(todo);
  });

  it("should not add a todo with empty title", () => {
    const todos: Todo[] = [];
    const todoTitle = "";
    const result = addTodo(todoTitle, todos);

    expect(result.success).toBeFalsy();
    expect(todoTitle.length).toBe(0);
    expect(todos.length).toBe(0);
  });

  it("should not add a todo with title shorter than 3 characters", () => {
    const todos: Todo[] = [];
    const todoTitle = "Wa";
    const result = addTodo(todoTitle, todos);

    expect(result.success).toBeFalsy();
    expect(todoTitle.length).toBeLessThan(3);
    expect(todos.length).toBe(0);
  });
});

describe("toggle todo", () => {
  it("should toggle a todo", () => {
    const todos: Todo[] = [];
    addTodo("Toggle me!", todos);
    const todo = todos[0];
    const result = toggleTodo(1, todos);

    expect(result.success).toBeTruthy();
    expect(todo.completed).toBe(true);
  });

  it("should not toggle a todo that does not exist", () => {
    const todos: Todo[] = [];
    addTodo("Item", todos);
    const result = toggleTodo(2, todos);

    expect(result.success).toBeFalsy();
    expect(todos[1]).toBeUndefined();
  });
});

describe("delete todo", () => {
  it("should delete a todo", () => {
    const todos: Todo[] = [];
    addTodo("Delete me!", todos);
    const result = deleteTodo(1, todos);

    expect(result.success).toBeTruthy();
    expect(todos.length).toBe(0);
  });

  it("should not delete a todo that does not exist", () => {
    const todos: Todo[] = [];
    const result = deleteTodo(1, todos);

    expect(result.success).toBeFalsy();
    expect(todos[0]).toBeUndefined();
  });
});
