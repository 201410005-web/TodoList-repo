function TaskItem({

    task,

    handleToggleStatus,

    handleDelete

}) {

    return (

        <div
            className={`task-item ${task.status}`}
        >

            <div className="task-info">

                <span className="task-title">
                    {task.title}
                </span>

                <div className="task-metadata">

                    <span>
                        Prioridad: {task.priority}
                    </span>

                    <span>
                        Estado: {task.status}
                    </span>

                    <span>
                        Creado:
                        {' '}
                        {new Date(
                            task.createdAt
                        ).toLocaleDateString()}
                    </span>

                </div>

            </div>

            <div className="task-actions">

                <button
                    className="btn-status"
                    onClick={() =>
                        handleToggleStatus(
                            task.id,
                            task.status
                        )
                    }
                >
                    {task.status === 'pendiente'
                        ? 'Completar'
                        : 'Reabrir'}
                </button>

                <button
                    className="btn-delete"
                    onClick={() =>
                        handleDelete(task.id)
                    }
                >
                    Eliminar
                </button>

            </div>

        </div>

    );

}

export default TaskItem;