import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  interface CustomPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className ?: string
  }
  
  export const CustomPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className
  }: CustomPaginationProps) => {
    const visiblePages = getVisiblePages(currentPage, totalPages)
  
    return (
      <Pagination className={`${className}`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
            />
          </PaginationItem>
  
          {visiblePages.map((page, index) =>
            page === "..." ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
  
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  
  // Utility to handle visible page range with ellipsis
  function getVisiblePages(current: number, total: number): (number | "...")[] {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
  
    if (current <= 3) {
      return [1, 2, 3, "...", total]
    }
  
    if (current >= total - 2) {
      return [1, "...", total - 2, total - 1, total]
    }
  
    return [1, "...", current, "...", total]
  }
  