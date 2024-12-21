import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUser = async () => {
	const cookieStore = await cookies();
	const authToken = cookieStore.get("auth_token");

	if (!authToken) {
		redirect("/login");
	}

	const res = await fetch("http://localhost:3001/api/profile", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Cookie: `auth_token=${authToken.value}`,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		redirect("/login");
	}

	return data;
};
