"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { use } from "react";

type UserContextType = {
	user: any | null;
	setUser: (user: any | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
	let context = useContext(UserContext);
	if (context === null) {
		
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

export function UserProvider({ children, userPromise }: { children: ReactNode; userPromise: Promise<any | null> }) {
	let initialUser = use(userPromise);
	const [user, setUser] = useState<any | null>(initialUser);

	useEffect(() => {
		setUser(initialUser);
	}, [initialUser]);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
