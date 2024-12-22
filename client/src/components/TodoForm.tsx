"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TodoFormData, todoSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TodoFormProps {
	type: "create" | "update";
	todoId?: string;
	title?: string;
	description?: string;
	closeDialog?: () => void;
}

export function TodoForm({ type, todoId, title, description, closeDialog }: TodoFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm<TodoFormData>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: title || "",
			description: description || "",
		},
	});

	const onSubmit = async (data: TodoFormData) => {
		startTransition(async () => {
			try {
				const endpoint =
					type === "create"
						? `${process.env.NEXT_PUBLIC_API_URL}/api/todo/addtodo`
						: `${process.env.NEXT_PUBLIC_API_URL}/api/todo/updatetodo/${todoId}`;

				const response = await fetch(endpoint, {
					method: type === "create" ? "POST" : "PUT",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					throw new Error(`Failed to ${type} todo`);
				}

				toast.success(`Todo ${type}d successfully`);
				if (closeDialog) closeDialog();
				router.refresh();
				if (type === "create") form.reset();
			} catch (error) {
				toast.error(`Failed to ${type} todo`);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter todo title..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter todo description..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isPending} className="w-full">
					{isPending
						? `${type === "create" ? "Creating" : "Updating"}...`
						: `${type === "create" ? "Create" : "Update"} Todo`}
				</Button>
			</form>
		</Form>
	);
}

export default TodoForm;
