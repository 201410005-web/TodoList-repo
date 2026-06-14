function TaskForm({

    title,
    priority,

    setTitle,
    setPriority,

    handleSubmit

}) {

    return (

        <form
            onSubmit={handleSubmit}
            className="todo-form"
        >

            <input
                type="text"
                placeholder="¿Alguna tarea pendiente?"
                value={title}
                onChange={(e) =>
                    setTitle(
                        e.target.value
                    )
                }
                required
            />

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(
                        e.target.value
                    )
                }
            >

                <option value="baja">
                    Baja
                </option>

                <option value="media">
                    Media
                </option>

                <option value="alta">
                    Alta
                </option>

            </select>

            <button type="submit">
                Agregar
            </button>

        </form>

    );

}

export default TaskForm;