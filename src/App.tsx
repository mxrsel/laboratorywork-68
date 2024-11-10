import TodoForm from "./components/TodoForm/TodoForm";
import Tasks from "./components/Tasks/Tasks.tsx";

const App = () => {


    return (
        <div className='mt-3'>
            <TodoForm />
            <Tasks />
        </div>
    );
};

export default App;