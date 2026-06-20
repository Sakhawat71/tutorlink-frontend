"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TutorSearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onSearch: () => void;
}

export const TutorSearchBar = ({ searchTerm, setSearchTerm, onSearch }: TutorSearchBarProps) => {
    return (
        <div className="my-10 max-w-sm md:max-w-lg mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
            <Search className="h-5 w-5 text-gray-500 ml-2" />
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by subject, grade, or tutor name"
                className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400"
            />
            <Button
                onClick={onSearch}
                className="rounded-full px-4 sm:px-6 bg-indigo-700 hover:bg-indigo-800"
            >
                Search
            </Button>
        </div>
    );
};