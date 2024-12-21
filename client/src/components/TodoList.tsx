"use client";

import { useState } from "react";
import { useTransition } from "react";
import { TodoInput } from "./TodoInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
	const [todos, setTodos] = useState(initialTodos);
	const [isPending, startTransition] = useTransition();

	const handleToggleTodo = async (id: string) => {
		startTransition(async () => {});
	};

	const handleDeleteTodo = async (id: string) => {
		startTransition(async () => {});
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">My Todo List</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<TodoInput />

				{todos.length === 0 ? (
					<div className="text-center text-gray-500 py-4">No todos yet. Add one above!</div>
				) : (
					<div className="space-y-2">
						{todos.map((todo) => (
							<div
								key={todo.id}
								className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
								<div className="flex items-center space-x-2 flex-1">
									<Checkbox
										id={`todo-${todo.id}`}
										checked={todo.completed}
										onCheckedChange={() => handleToggleTodo(todo.id)}
										disabled={isPending}
										aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
									/>
									<label
										htmlFor={`todo-${todo.id}`}
										className={`text-sm ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
										{todo.text}
									</label>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleDeleteTodo(todo.id)}
									disabled={isPending}
									aria-label={`Delete "${todo.text}"`}
									className="opacity-0 group-hover:opacity-100 transition-opacity">
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
