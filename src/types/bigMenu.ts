export interface User {
    id:      number,
    email:   string,
    name:    string,
    surname: string,
}

export interface SocketSortListsCountRequest {
    uuid: string,
    message: MessageItem[]
}
export interface MessageItem {
    id: number,
    count: number
}

export interface SocketListsRequest {
    uuid: string,
    message: ListsItem[]
}
export interface ListsItem {
    key: number | null,
    id: number | null,
    name: string,
    count_of_active_tasks: number,
    color: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    owner_id: number | null
}

export interface SocketTagsRequest {
    uuid: string,
    message: TagItem[]
}
export interface TagItem {
    key: null | number,
    id: number,
    name: string,
    created_at: string,
    updated_at: string | null,
    deleted_at: string | null,
    pivot: {
        user_id: string,
        tag_id: string
    }
}