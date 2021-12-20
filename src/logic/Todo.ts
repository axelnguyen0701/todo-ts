export type Todo = Readonly<{
  id: number;
  text: string;
  done: boolean;
  location?: string;
}>;

type DoneTodo = Todo & {
  done: true;
};

export function addTodo(todo: Todo, todoList: readonly Todo[]): Todo[] {
  return [...todoList, todo];
}

export function removeTodo(
  removedTodo: Todo,
  todoList: readonly Todo[]
): Todo[] {
  return todoList.filter((todo) => todo.id !== removedTodo.id);
}

export function doneAll(todoList: readonly Todo[]): DoneTodo[] {
  return todoList.map((todo) => ({ ...todo, done: true }));
}

export function toggleTodo(todo: Todo): Todo {
  return {
    id: todo.id,
    text: todo.text,
    done: !todo.done,
    location: todo.location,
  };
}
