export interface List {
    id: number | null,
    name: string,
    count_of_active_tasks: number,
    color: string,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    owner_id: number | null,
    tasks: Task[],
}

export interface Task {
    changer?: number | null,
    id: number | null,
    id_list: number,
    name: string | null,
    description: string | null,
    deadline: string | null,
    is_done: number,
    is_flagged: number,
    url: string | null,
    priority: null,
    tags: Tag[],
    possibleTags: Tag[],
    tagCreatorKey?: number | null,
}

export interface Tag {
    key?: number | null,
    id: number | null,
    name: string,
    created_at?: string | null,
    updated_at?: string | null,
    deleted_at?: string | null,
    task_id?: number | null,
    uuid?: string,
}

export interface FoundedListWithTasks {
    changer: number | null,
    id: number,
    name: string,
    count_of_active_tasks: number,
    color: string,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    owner_id: number,
    tasks: Task[]
}

export interface Alert {
    id: number,
    name: string,
    description: string,
    top?: string | null
}