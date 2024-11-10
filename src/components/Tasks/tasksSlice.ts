import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskList, Todo, TodoMutation} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

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

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (task: Todo) => {
        await axiosApi.put(`tasks/${task.id}.json`, task);
        return task;
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId: string) => {
        await axiosApi.delete(`tasks/${taskId}.json`);
        return taskId;
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
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -2) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });

    }
});

export const tasksReducer = tasksSlice.reducer

