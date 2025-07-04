import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

interface TablePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TablePagination({ page, totalPages, onPageChange }: TablePaginationProps) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        )
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className="w-full px-0 py-2 pt-4 flex">
      <Pagination className="w-full flex justify-center items-center bg-card  rounded-b-md">
        <PaginationContent className="w-full flex justify-between items-center px-4">
          <PaginationItem>
            <PaginationPrevious
              onClick={page > 1 ? () => onPageChange(page - 1) : undefined}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : 0}
              style={{
                cursor: 'pointer',
                ...(page === 1 ? { pointerEvents: 'none', opacity: 0.5 } : {}),
              }}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          <div className="flex gap-1">
            {getPages().map((p, idx) =>
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <PaginationItem key={`page-${p}`}>
                  <PaginationLink
                    isActive={page === p}
                    onClick={() => onPageChange(Number(p))}
                    style={{ cursor: 'pointer' }}
                    className={`size-7 rounded ${page === p ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
          </div>
          <PaginationItem>
            <PaginationNext
              onClick={page < totalPages ? () => onPageChange(page + 1) : undefined}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : 0}
              style={{
                cursor: 'pointer',
                ...(page === totalPages ? { pointerEvents: 'none', opacity: 0.5 } : {}),
              }}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
