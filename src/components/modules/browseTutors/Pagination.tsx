"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pages.map((p) => (
                <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => onPageChange(p)}
                    className={p === page ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                >
                    {p}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};