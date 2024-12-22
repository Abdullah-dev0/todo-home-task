"use client";

import { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";
import { use, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { TodoTabs } from "./todo-tabs";
import { TodoItem } from "./TodoItems";

interface TodoListProps {
	initialTodos: Promise<{ todos: Todo[] }>;
}

export function TodoList({ initialTodos }: TodoListProps) {
	const { todos } = use(initialTodos);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

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

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/toggletodo/${id}`, {
					method: "PATCH",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.status !== 200) {
					throw new Error("Failed to toggle todo");
				}

				toast.success("Todo updated successfully");

				router.refresh();
			} catch (error) {
				toast.error("Failed to update todo");
			}
		});
	};

	const handleDeleteTodo = async (id: string) => {
		startTransition(async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo/deletetodo/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				});

				if (response.status !== 200) {
					throw new Error("Failed to delete todo");
				}

				toast.success("Todo deleted successfully");
				router.refresh();
			} catch (error: any) {
				toast.error("Failed to delete todo", {
					description: error.message,
				});
			}
		});
	};

	return (
		<div className="space-y-6 pt-4">
			<TodoTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				allCount={todos.length}
				dueCount={todos.filter((t: any) => !t.completed).length}
				completedCount={todos.filter((t: any) => t.completed).length}
			/>
			<div className="space-y-4">
				{filterTodos.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">No todos yet.</div>
				) : (
					filterTodos.map((todo: any) => (
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
