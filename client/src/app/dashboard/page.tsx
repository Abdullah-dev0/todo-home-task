import { Navbar } from "@/components/Navbar";
import { TodoList } from "@/components/todo-list";
import TodoForm from "@/components/TodoForm";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Dashboard() {
	const authToken = (await cookies()).get("auth_token");

	const res = await fetch(`${process.env.BASE_API}/api/todo/gettodos`, {
		method: "GET",
		credentials: "include",

		headers: {
			"Content-Type": "application/json",
			Cookie: `auth_token=${authToken?.value}`,
		},
	});

	const { todos } = await res.json();

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
						<Suspense fallback={<div>Loading...</div>}>
							<TodoList todos={todos} />
						</Suspense>
					</div>
				</div>
			</main>
		</div>
	);
}
