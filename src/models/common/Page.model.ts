
export interface PageRequest {
    page?: number,
    size?: number,
    sort?: string
}

export interface PageResponse<T> {
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    content: T[]
}