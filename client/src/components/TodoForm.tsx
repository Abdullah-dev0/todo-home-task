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

export function TodoForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const form = useForm<TodoFormData>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const onSubmit = async (data: TodoFormData) => {
		startTransition(async () => {
			try {
				const response = await fetch("http://localhost:3001/api/todo/addtodo", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					throw new Error("Failed to create todo");
				}

				toast.success("Todo created successfully");
				router.refresh();
				form.reset();
			} catch (error) {
				toast.error("Failed to create todo");
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-lg">
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
					{isPending ? "Creating..." : "Create Todo"}
				</Button>
			</form>
		</Form>
	);
}

export default TodoForm;
