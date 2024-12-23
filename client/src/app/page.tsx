import Link from "next/link";
import { CheckCircle, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
			<main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
				<h2 className="text-5xl font-bold mb-8">Organize Your Life with TaskMaster</h2>
				<p className="text-xl  mb-12 max-w-2xl">
					The ultimate todo app for boosting your productivity. Simple, elegant, and powerful.
				</p>
				<div className="flex space-x-6">
					<Link href="/signup">
						<Button className=" hover:opacity-90 py-3 px-4 rounded-lg text-lg font-semibold  transition-colors duration-200">
							<UserPlus className="mr-2" size={24} />
							Get Started
						</Button>
					</Link>
					<Link href="/login">
						<Button className=" hover:opacity-90 py-3 px-4 rounded-lg text-lg font-semibold  transition-colors duration-200">
							<LogIn className="mr-2" size={24} />
							Sign In
						</Button>
					</Link>
				</div>
			</main>

			<section className=" py-16">
				<div className="container mx-auto px-4">
					<h3 className="text-3xl font-bold mb-8 text-center">Why Choose TaskMaster?</h3>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ title: "Easy to Use", description: "Intuitive interface for quick task management" },
							{ title: "Stay Organized", description: "Categorize and prioritize your tasks effortlessly" },
							{ title: "Boost Productivity", description: "Track your progress and achieve your goals" },
						].map((feature, index) => (
							<div key={index} className=" p-6 rounded-lg flex flex-col items-center text-center">
								<CheckCircle className="text-blue-400 mb-4" size={48} />
								<h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<footer className=" py-8 text-center">
				<div className="container mx-auto px-4">
					<p>&copy; 2023 TaskMaster. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
