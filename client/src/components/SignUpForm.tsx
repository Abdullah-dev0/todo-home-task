"use client";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, type SignUpFormData } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignupForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (data: SignUpFormData) => {
		startTransition(async () => {
			const result = await signUp(data);
			if (!result.success) {
				if (result.status === 400) {
					toast.error(result.message || "User already exists");
					return;
				}
				toast.error(result.message || "Something went wrong");
				return;
			}

			router.push("/dashboard");
			toast.success(result.message);
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>Create a new account to get started</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Enter your full name" {...register("name")} />
								{errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="Enter your email address" {...register("email")} />
								{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" placeholder="Create a password" {...register("password")} />
								{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Confirm your password"
									{...register("confirmPassword")}
								/>
								{errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
							</div>
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? "Signing up..." : "Sign Up"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm font-semibold">
							Already have an account? <Link href="/login">Log in</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
