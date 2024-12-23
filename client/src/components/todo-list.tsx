"use client";

import { deleteTodo, toggleTodo } from "@/actions/todo";
import { Todo } from "@/types/todo";
import { use, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { TodoTabs } from "./todo-tabs";
import { TodoItem } from "./TodoItems";

interface TodoListProps {
	intialtodos: Promise<Todo[]>;
}

export function TodoList({ intialtodos }: TodoListProps) {
	const todos = use(intialtodos);
	const [isPending, startTransition] = useTransition();

	const [optimisticTodos, addOptimisticTodo] = useOptimistic(
		todos,
		(state: Todo[], newTodo: { type: "toggle"; id: string }) => {
			if (newTodo.type === "toggle") {
				return state.map((todo) => (todo.id === newTodo.id ? { ...todo, completed: !todo.completed } : todo));
			}
			return state;
		},
	);

	const [activeTab, setActiveTab] = useState<"all" | "due" | "completed">("all");

	const filterTodos = optimisticTodos.filter((todo) => {
		if (activeTab === "due") return !todo.completed;
		if (activeTab === "completed") return todo.completed;
		return true;
	});

	const handleToggleTodo = async (id: string) => {
		startTransition(async () => {
			try {
				addOptimisticTodo({ type: "toggle", id });
				const result = await toggleTodo(id);

				if (!result.success) {
					throw new Error(result.message);
				}

				toast.success(result.message);
			} catch (error) {
				toast.error("Failed to update todo");
			}
		});
	};

	const handleDeleteTodo = async (id: string) => {
		startTransition(async () => {
			try {
				const result = await deleteTodo(id);

				if (!result.success) {
					throw new Error(result.message);
				}

				toast.success(result.message);
			} catch (error) {
				toast.error("Failed to delete todo");
			}
		});
	};

	return (
		<div className="space-y-6 pt-4">
			<TodoTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				allCount={todos.length}
				dueCount={todos.filter((t) => !t.completed).length}
				completedCount={todos.filter((t) => t.completed).length}
			/>
			<div className="space-y-4">
				{filterTodos.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">No todos yet.</div>
				) : (
					filterTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onToggle={handleToggleTodo}
							onDelete={handleDeleteTodo}
							isPending={isPending}
						/>
					))
				)}
			</div>
		</div>
	);
}
