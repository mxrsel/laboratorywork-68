import React from "react";
import {Todo} from "../../types.ts";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "./tasksSlice.ts";
import {AppDispatch} from "../../app/store.ts";

interface Props {
    tasks: Todo
}

const TasksItem: React.FC<Props> = ({tasks}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleCheckboxChange = () => {
        dispatch(updateTask({ ...tasks, status: !tasks.status }));
    };

    const handleDelete = () => {
        dispatch(deleteTask(tasks.id));
    };

    return (
        <div className='mt-3'>
        <div className='card border-black p-2'>
            <label className='text-body-secondary'
            >
                Done
            <input
            type='checkbox'
            checked={tasks.status}
            onChange={handleCheckboxChange}
            className='form-check-input'
            />
            </label>

            <p className='fs-3'>{tasks.name}</p>
            <button className='btn btn-dark' type='submit' onClick={handleDelete}>Delete</button>
        </div>
        </div>
    );
};

export default TasksItem;