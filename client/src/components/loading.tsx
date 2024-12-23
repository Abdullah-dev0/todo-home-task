import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LoadingSkeleton = () => {
	return (
		<div className="bg-card rounded-lg shadow-sm border p-6">
			<TodoTabsSkeleton />
			<TodoItemSkeleton />
		</div>
	);
};

export function TodoTabsSkeleton() {
	return (
		<div className="space-y-6 pt-4">
			<Tabs defaultValue="all" className="w-full">
				<TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
					{["All", "Due", "Completed"].map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab.toLowerCase()}
							className="border-b-2 border-transparent rounded-none px-4 py-2"
							disabled>
							{tab} (<Skeleton className="h-4 w-6 inline-block" />)
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
			<div className="space-y-4">
				{[...Array(3)].map((_, index) => (
					<TodoItemSkeleton key={index} />
				))}
			</div>
		</div>
	);
}

export function TodoItemSkeleton() {
	return (
		<div className="w-full bg-card rounded-lg border p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 flex-1">
					<Skeleton className="h-4 w-4 rounded" />
					<div className="flex flex-col space-y-2">
						<Skeleton className="h-5 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Skeleton className="h-8 w-8 rounded" />
					<Skeleton className="h-8 w-8 rounded" />
					<Skeleton className="h-8 w-8 rounded" />
				</div>
			</div>
		</div>
	);
}
