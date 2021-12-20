import { Typography } from "@mui/material";
import React from "react";
import { addTodo, removeTodo, Todo, toggleTodo } from "../logic/Todo";
import "./App.css";
import FormBox from "./FormBox/FormBox";
import TodoBox from "./TodoBox/TodoBox";

function App() {
  const [todoList, setTodoList] = React.useState<Todo[]>(
    JSON.parse(localStorage.getItem("todoList") || "{}")
  );

  React.useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodo = (todo: Todo) => {
    setTodoList(addTodo(todo, todoList));
  };

  const handleDeleteTodo = (todo: Todo) => {
    setTodoList(removeTodo(todo, todoList));
  };

  const handleToggleDone = (todo: Todo) => {
    todo = toggleTodo(todo);
    setTodoList(todoList.map((t) => (t.id === todo.id ? todo : t)));
  };

  const renderedTodoBox = () => {
    return todoList.map((todo) => (
      <TodoBox
        key={todo.id}
        handleDeleteTodo={handleDeleteTodo}
        {...todo}
        handleToggleDone={handleToggleDone}
      />
    ));
  };

  return (
    <div className="App">
      <Typography component={"h1"} variant={"h2"}>
        My To-do List
      </Typography>
      <FormBox handleAddTodo={handleAddTodo} lastId={todoList.length} />
      {renderedTodoBox()}
    </div>
  );
}

export default App;
