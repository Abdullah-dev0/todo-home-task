"use client";

import { Login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, type SignInFormData } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
	const [isLoading, startAction] = useTransition();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = (data: SignInFormData) => {
		startAction(async () => {
			const res = await Login(data);
			if (res?.status === 200) {
				router.push("/dashboard");
				toast.success("Logged in successfully");
				return;
			}
			toast.error("Failed to login", {
				description: "Invalid credentials",
			});
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
								{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" type="password" placeholder="*******" {...register("password")} />
								{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
							</div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Logging in..." : "Login"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm font-semibold">
							<Link href="/signup"> Dont have an account ? sign up</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
