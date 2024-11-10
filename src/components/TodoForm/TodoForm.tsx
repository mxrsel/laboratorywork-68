import React, { useState } from "react";
import { TodoMutation } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { createTask } from "../Tasks/tasksSlice";

const TodoForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const [task, setTask] = useState<TodoMutation>({
        name: "",
        status: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask((prevState) => ({
                ...prevState,
                [name]: value
            }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createTask(task));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={task.name}
                    onChange={handleChange}
                    className='form-control'
                />
            </div>
            <button className="btn btn-dark mt-2">Add Task</button>
        </form>
    );
};

export default TodoForm;
