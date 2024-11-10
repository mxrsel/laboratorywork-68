import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { fetchTasks } from "./tasksSlice.ts";
import TasksItem from "./TasksItem.tsx";

const Tasks = () => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            <h1 className='text-center mt-5'>Tasks List</h1>
            {tasks.map((task) => (
                <TasksItem key={task.id} tasks={task} />
            ))}
        </div>
    );
};

export default Tasks;