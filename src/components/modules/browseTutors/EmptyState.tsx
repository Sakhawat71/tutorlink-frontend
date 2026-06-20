import { SearchX } from "lucide-react";

export const EmptyState = () => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center min-h-50 gap-3">
            <SearchX className="h-10 w-10 text-gray-300" />
            <div className="col-span-full flex items-center justify-center min-h-50">
                <p className="text-red-400 text-2xl">No tutors found</p>
            </div>
            <p className="text-gray-400 text-sm">Try adjusting your search term or filters</p>
        </div>
    );
};