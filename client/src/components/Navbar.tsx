"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Navbar() {
	const pathname = usePathname();
	const Router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [dropdownOpen, setDropdownOpen] = useState(false);

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
		<nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<div className="mr-4 flex">
					<Link href="/" className="flex items-center space-x-2">
						<span className="font-bold text-xl">✅ TodoApp</span>
					</Link>
				</div>

				<div className="flex items-center space-x-6 justify-between flex-1">
					<div className="flex gap-6">
						<Link
							href="/dashboard"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
							}`}>
							Dashboard
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<User className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem 
									onClick={handleLogout} 
									disabled={isPending}
									className="text-red-600"
								>
									{isPending ? (
										<>
											<Loader2 className="h-4 w-4 mr-2 animate-spin" />
											Logging out...
										</>
									) : (
										"Logout"
									)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
