import React from "react";
import {Todo} from "../../types.ts";

interface Props {
    tasks: Todo
}

const TasksItem: React.FC<Props> = ({tasks}) => {
    return (
        <div>
            <label>
            <input
            type='checkbox'
            checked={tasks.status}
            onChange={() => tasks.status = !tasks.status}
            />
                Done
            </label>

            <p>{tasks.name}</p>
        </div>
    );
};

export default TasksItem;