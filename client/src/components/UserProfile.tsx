import React, { use } from "react";

export interface User {
	user: {
		id: string;
		name: string;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
}

export interface UserProfileProps {
	data: Promise<User>;
}

const UserProfile = ({ data }: UserProfileProps) => {
	const user = use(data);
	console.log(user);
	return (
		<div>
			<h2>User Profile</h2>
			<p>Name: {user.user.name}</p>
			<p>Email: {user.user.email}</p>
		</div>
	);
};

export default UserProfile;
