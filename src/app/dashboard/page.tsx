"use client";
import { useState, useEffect } from "react";

import PageTransition from "@/components/PageTransition";
import { InputTodo } from "@/app/dashboard/_components/InputTodo";
import { Todolist } from "@/app/dashboard/_components/TodoList";
import { getTodos } from "@/actions/todo";
import { toast } from "sonner";

interface TodoProps {
  id: string;
  userId?: string;
  description: string | null;
  completed: boolean;
}

const Dashboard = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const fetchTodos = async () => {
    const result = await getTodos();
    if (result?.todos) {
      setTodos(result.todos);
    } else {
      toast.error("Erro ao carregar as tarefas. ");
    }
  };

  const updateTodo = (id: string, completed: boolean, description?: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed, description: description ?? todo.description }
          : todo,
      ),
    );
  };

  const deleteTodoState = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (todo: TodoProps) => {
    setTodos([...todos, todo]);
  };

  return (
    <PageTransition>
      <section>
        <div>
          <InputTodo addTodo={addTodo} />
        </div>
        <div>
          <Todolist
            todos={todos}
            updateTodo={updateTodo}
            deleteTodoState={deleteTodoState}
          />
        </div>
      </section>
    </PageTransition>
  );
};

export default Dashboard;
