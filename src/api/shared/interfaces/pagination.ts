export type PaginationReturn<T extends any = any> = {
    pagination: {
        result: number,
        pages: number,
        prevPage: number,
        currentPage: number,
        nextPage: number
    },
    data: T[]
}