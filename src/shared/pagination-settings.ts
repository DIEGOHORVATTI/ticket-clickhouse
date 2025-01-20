type Props = {
  page: number
  limit: number
}

export const paginationSettings = ({ page, limit }: Props) => ({
  page,
  limit,
  customLabels: {
    totalDocs: 'total',
    docs: 'data',
    limit: 'per_page',
    page: 'current_page',
    nextPage: 'next_page',
    prevPage: 'prev_page',
    totalPages: 'last_page',
    hasNextPage: 'has_next_page',
    hasPrevPage: 'has_prev_page'
  }
})
