import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { fetchTasks } from "./tasksSlice.ts";
import TasksItem from "./TasksItem.tsx";
import Spinner from "../Spinner/Spinner.tsx";

const Tasks = () => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
    const isError = useSelector((state: RootState) => state.tasks.isError);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <p className='text-center mt-3 fs-2' >Error fetching tasks</p>
    }

    return (
        <div>
            <h1 className='text-center mt-5'>Tasks List</h1>
            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                tasks.map((task) => (
                        <TasksItem key={task.id} tasks={task} />
                    ))
            )}
        </div>
    );
};

export default Tasks;