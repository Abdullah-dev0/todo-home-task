import { cookies } from "next/headers";

export const getUser = async () => {
	const authToken = (await cookies()).get("auth_token");
	const res = await fetch("http://localhost:3001/api/profile", {
		method: "GET",
		credentials: "include",
		next: {
			revalidate: 60 * 60 * 24, // 24 hours
		},
		headers: {
			"Content-Type": "application/json",
			Cookie: `auth_token=${authToken?.value}`,
		},
	});

	const data = await res.json();

	if (res.status !== 200) {
		return null;
	}

	return data;
};

export const getTodos = async () => {
	try {
		const authToken = (await cookies()).get("auth_token");

		const res = await fetch(`http://localhost:3001/api/todo/gettodos`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Cookie: `auth_token=${authToken?.value}`,
			},
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("Server response:", errorText);
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch todos:", error);
		return null;
	}
};
