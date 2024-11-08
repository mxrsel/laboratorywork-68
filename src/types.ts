export interface Todo {
    id: string
    name: string;
    status: boolean;
}

export interface TodoMutation {
    name: string;
    status: boolean;
}


export interface TaskList {
    [id: string]: Todo;
}