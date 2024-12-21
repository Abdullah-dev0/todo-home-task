import Navbar from "@/components/Navbar";
import { TodoList } from "@/components/TodoList";
import UserProfile from "@/components/UserProfile";
import { getUser } from "@/lib/api";
import { Suspense } from "react";

const Dashboard = async () => {
	const data = getUser();

	const todos = [
		{ id: "1", text: "Buy groceries", completed: false },
		{ id: "2", text: "Walk the dog", completed: true },
		{ id: "3", text: "Do laundry", completed: false },
	];

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto space-y-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
						<p className="mt-2 text-xl text-gray-600">Welcome to your personal task manager</p>
					</div>
					<Suspense fallback={<div className="text-center text-gray-600">Loading todos...</div>}>
						<TodoList initialTodos={todos} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
