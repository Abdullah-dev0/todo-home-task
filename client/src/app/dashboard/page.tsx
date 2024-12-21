import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const Dashboard = async () => {
	const cookieStore = await cookies();
	const authToken = cookieStore.get("auth_token");

	if (!authToken) {
		redirect("/login");
	}

	const res = await fetch("http://localhost:3001/api/profile", {
		method: "GET",
		credentials: "include",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
			Cookie: `auth_token=${authToken.value}`,
		},
	});

	const data = await res.json();

	console.log(data);
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to your dashboard</p>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
};

export default Dashboard;
