import TaskItem from './TaskItem';

function TaskList({

    tasks,

    handleToggleStatus,

    handleDelete

}) {

    if (!Array.isArray(tasks)) {

        return (
            <p className="no-tasks">
                Error cargando tareas
            </p>
        );

    }

    if (tasks.length === 0) {

        return (
            <p className="no-tasks">
                No hay tareas registradas.
            </p>
        );

    }

    return (

        <>

            {tasks.map((task) => (

                <TaskItem
                    key={task.id}
                    task={task}
                    handleToggleStatus={
                        handleToggleStatus
                    }
                    handleDelete={
                        handleDelete
                    }
                />

            ))}

        </>

    );

}

export default TaskList;