"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { use, useTransition } from "react";
import { toast } from "sonner";
import TodoForm from "../components/TodoForm";
import { TodoItem } from "./TodoItems";

export function TodoList({ initialTodos }: any) {
	const { todos }: any = use(initialTodos);
	const [isPending, startTransition] = useTransition();
	const Router = useRouter();

	const handleToggleTodo = async (id: string) => {
		startTransition(async () => {});
	};

	const handleDeleteTodo = async (id: string) => {
		startTransition(async () => {
			try {
				const response = await fetch(`http://localhost:3001/api/todo/deletetodo/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				});

				if (response.status !== 200) {
					throw new Error("Failed to delete todo");
				}

				toast.success("Todo deleted successfully");
				Router.refresh();
			} catch (error: any) {
				toast.error("Failed to delete todo", {
					description: error.message,
				});
			}
		});
	};

	return (
		<div className="space-y-6">
			<TodoForm />
			{/* <TodoTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				allCount={todos.length}
				dueCount={todos.filter((t) => !t.completed).length}
				completedCount={todos.filter((t) => t.completed).length}
			/> */}
			<div className="space-y-4">
				{todos.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">No todos yet.</div>
				) : (
					todos.map((todo: any) => (
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
