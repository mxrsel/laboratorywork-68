import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskList, Todo, TodoMutation} from "../types.ts";
import axiosApi from "../axiosApi.ts";

interface iTasksSlice {
    tasks: Todo[]
    isLoading: boolean
    isError: boolean
}

const initialState: iTasksSlice = {
    tasks: [],
    isLoading: false,
    isError: false,
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async() => {
    const response: {data: TaskList} = await axiosApi.get('tasks.json')
    const taskList = response.data
    const tasks = Object.keys(taskList).map((id) => ({
          ...taskList[id],
        id
    }));
    return tasks
});

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData: TodoMutation) => {
        const response = await axiosApi.post<Todo>("tasks.json", taskData);
        return {
            id: response.data.name,
            ...taskData
        };
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTasks.pending, (state) => {
                    state.isLoading = true
                    state.isError = false
                })
            .addCase(
                fetchTasks.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.tasks = action.payload
                })
            .addCase(
                fetchTasks.rejected, (state) => {
                    state.isLoading = false
                    state.isError = true
                })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
    }
});

export const tasksReducer = tasksSlice.reducer

