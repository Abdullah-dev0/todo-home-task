"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function TodoInput() {
	const [newTodo, setNewTodo] = useState("");
	const [isLoading, startTransition] = useTransition();

  
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(() => {});
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center space-x-2">
			<Input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="What needs to be done?"
				className="flex-grow"
			/>
			<Button type="submit" disabled={isLoading || !newTodo.trim()}>
				<PlusCircle className="mr-2 h-4 w-4" />
				Add
			</Button>
		</form>
	);
}
