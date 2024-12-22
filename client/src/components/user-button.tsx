"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, User } from "lucide-react";
import { useState } from "react";

type UserButtonProps = {
	handleSignout: () => void;
	isLoading: boolean;
};

export function UserButton({ handleSignout, isLoading }: UserButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DropdownMenu open={isLoading ? true : isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<User className="h-6 w-6 cursor-pointer" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignout} disabled={isLoading} className="text-red-600 focus:text-red-600">
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Logging out...
						</>
					) : (
						"Log out"
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
