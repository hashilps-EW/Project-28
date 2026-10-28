export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2 animate-pulse" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
