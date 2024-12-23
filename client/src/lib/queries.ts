import { cookies } from "next/headers";

export const getUser = async () => {
	const authToken = (await cookies()).get("auth_token");
	const res = await fetch(`${process.env.BASE_API}/api/profile`, {
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
