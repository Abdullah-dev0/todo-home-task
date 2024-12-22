"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";

export function Navbar() {
	const Router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleLogout = async () => {
		startTransition(async () => {
			try {
				const res = await fetch("http://localhost:3001/api/auth/signout", {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 200) {
					toast.success("Logged out successfully");
					Router.push("/login");
				} else {
					toast.error("Failed to logout");
				}
			} catch (error) {
				toast.error("Network error occurred");
			}
		});
	};

	return (
		<nav className="border-b bg-background/95 backdrop-blur p-5 supports-[backdrop-filter]:bg-background/60">
			<div className="container flex  max-w-screen-2xl items-center">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex items-center space-x-2">
						<a href="/" className="flex items-center space-x-2">
							<span className="font-bold inline-block">Todos</span>
						</a>
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
