import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthPage() {
	return (
		<Link href="/signup">
			<Button>Signin</Button>
		</Link>
	);
}
