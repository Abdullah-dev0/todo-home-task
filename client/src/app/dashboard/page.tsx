import { getTodos } from "@/actions/todo";
import { LoadingSkeleton } from "@/components/loading";
import { Navbar } from "@/components/Navbar";
import { TodoList } from "@/components/todo-list";
import TodoForm from "@/components/TodoForm";
import { Suspense } from "react";

export default async function Dashboard() {
	const todos = getTodos();

	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="container  mx-auto px-4 py-7">
				<div className="space-y-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-foreground">My Todos List</h1>
						<p className="mt-2 text-xl text-muted-foreground">Manage your tasks efficiently</p>
					</div>
					<div className="bg-card rounded-lg shadow-sm border p-6">
						<TodoForm type={"create"} />
						<Suspense fallback={<LoadingSkeleton />}>
							<TodoList intialtodos={todos} />
						</Suspense>
					</div>
				</div>
			</main>
		</div>
	);
}
