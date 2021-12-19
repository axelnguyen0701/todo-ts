import { addTodo, removeTodo, toggleTodo, Todo, doneAll } from "../logic/Todo";

let todo: Todo;
let todoList: Todo[];

beforeEach(() => {
  todo = { id: 1, text: "First thing", done: false };
  todoList = [];
});

test("Add todo", () => {
  todoList = addTodo(todo, todoList);
  expect(todoList).toEqual([{ id: 1, text: "First thing", done: false }]);
});

test("Remove todo", () => {
  todoList = addTodo(todo, todoList);
  todoList = removeTodo(todo, todoList);
  expect(todoList).toEqual([]);
});

test("Toggle Todo", () => {
  todo = toggleTodo(todo);
  expect(todo).toEqual({ id: 1, text: "First thing", done: true });
  expect(toggleTodo(todo)).toEqual({ ...todo, done: false });
});

test("Done all", () => {
  todoList = addTodo(todo, todoList);
  todoList = doneAll(todoList);
  expect(todoList).toEqual([{ id: 1, text: "First thing", done: true }]);
});
