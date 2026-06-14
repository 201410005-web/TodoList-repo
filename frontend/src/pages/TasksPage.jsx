import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TasksPage({

    tasks,

    title,
    priority,

    setTitle,
    setPriority,

    handleSubmit,

    handleToggleStatus,
    handleDelete

}) {

    return (

        <div className="todo-container">

            <h1 className="main-title">
                To Do List
            </h1>

            <TaskForm

                title={title}
                priority={priority}

                setTitle={setTitle}
                setPriority={setPriority}

                handleSubmit={handleSubmit}

            />

            <div className="tasks-list">

                <TaskList

                    tasks={tasks}

                    handleToggleStatus={
                        handleToggleStatus
                    }

                    handleDelete={
                        handleDelete
                    }

                />

            </div>

        </div>

    );

}

export default TasksPage;