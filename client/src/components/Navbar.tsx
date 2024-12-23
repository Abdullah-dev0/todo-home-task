"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";
import Link from "next/link";
import { signOut } from "@/actions/auth";

export function Navbar() {
	const Router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleLogout = async () => {
		startTransition(async () => {
			const res = await signOut();
			if (res?.status === 200) {
				Router.push("/");
				toast.success("Logged out successfully");
				return;
			}
		});
	};

	return (
		<nav className="border-b bg-background/95 backdrop-blur p-5 supports-[backdrop-filter]:bg-background/60">
			<div className="container flex  max-w-screen-2xl items-center">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link href="/dashboard">Todo App</Link>
					</div>
					<div className="flex items-center space-x-2">
						<ModeToggle />
						<UserButton isLoading={isPending} handleSignout={handleLogout} />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
