"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  total: number;
  showing: number;
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function PaginationBar({
  total,
  showing,
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <span className="font-mono text-[10px] text-gray-400">
        Showing {showing} of {total} users
      </span>

      <Pagination className="w-auto mx-0">
        <PaginationContent className="gap-1 ">
          <PaginationItem>
            <PaginationPrevious
              href={
                currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"
              }
              className={`h-[30px] rounded-[6px] border border-gray-200 font-mono text-[11px] text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all bg-white ${currentPage <= 1 ? "opacity-30 pointer-events-none" : ""}`}
            />
          </PaginationItem>

          {pages.map((page, i) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis className="w-[30px] h-[30px] font-mono text-[11px] text-gray-400" />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`${basePath}?page=${page}`}
                  isActive={page === currentPage}
                  className={`w-[30px] h-[30px] rounded-[6px] border font-mono text-[11px] flex items-center justify-center transition-all p-0 ${page === currentPage ? "bg-[#f05a1a] text-white border-[#f05a1a] hover:bg-[#ff7c3f]" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300"}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages
                  ? `${basePath}?page=${currentPage + 1}`
                  : "#"
              }
              className={`h-[30px] rounded-[6px] border border-gray-200 font-mono text-[11px] text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all bg-white ${currentPage >= totalPages ? "opacity-30 pointer-events-none" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
