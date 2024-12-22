"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TodoTabsProps {
	allCount: number;
	dueCount: number;
	completedCount: number;
	activeTab: "all" | "due" | "completed";

	onTabChange: (value: "all" | "due" | "completed") => void;
}

export function TodoTabs({ allCount, dueCount, completedCount, activeTab, onTabChange }: TodoTabsProps) {
	const handleValueChange = (value: string) => {
		onTabChange(value as "all" | "due" | "completed");
	};
	return (
		<Tabs value={activeTab} onValueChange={handleValueChange} className="w-full">
			<TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
				<TabsTrigger
					value="all"
					className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2">
					All ({allCount})
				</TabsTrigger>
				<TabsTrigger
					value="due"
					className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2">
					Due ({dueCount})
				</TabsTrigger>
				<TabsTrigger
					value="completed"
					className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-4 py-2">
					Completed ({completedCount})
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
