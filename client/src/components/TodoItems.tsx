"use client";

import { format } from "date-fns";
import { Trash2, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface TodoItemProps {
	todo: any;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	isPending?: boolean;
}

export function TodoItem({ todo, onToggle, onDelete, isPending }: TodoItemProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="w-full bg-card rounded-lg border p-4 hover:bg-accent/50 transition-colors">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 flex-1 ">
					<Checkbox
						id={`todo-${todo.id}`}
						checked={todo.completed}
						onCheckedChange={() => onToggle(todo.id)}
						aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
					/>
					<div className="flex flex-col">
						<label
							htmlFor={`todo-${todo.id}`}
							className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
							{todo.title}
						</label>
						<div className="flex items-center space-x-2 text-sm text-muted-foreground">
							<Clock className="h-3 w-3" />
							<span>{format(todo.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						size="icon"
						variant="ghost"
						onClick={() => onDelete(todo.id)}
						disabled={isPending}
						aria-label={`Delete "${todo.title}"`}>
						<Trash2 className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsExpanded(!isExpanded)}
						aria-label={isExpanded ? "Collapse description" : "Expand description"}>
						{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
					</Button>
				</div>
			</div>
			{isExpanded && todo.description && (
				<div className="mt-2 pl-8 pt-2 border-t text-lg text-muted-foreground">{todo.description}</div>
			)}
		</div>
	);
}
