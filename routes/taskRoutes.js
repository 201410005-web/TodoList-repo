const express = require('express');

const router =
    express.Router();

const authMiddleware =
    require(
        '../middlewares/authMiddleware'
    );

const {

    getTasks,

    createTask,

    updateTask,

    patchTask,

    deleteTask

} =
require(
    '../controllers/taskController'
);

router.get(
    '/',
    authMiddleware,
    getTasks
);

router.post(
    '/',
    authMiddleware,
    createTask
);

router.put(
    '/:id',
    authMiddleware,
    updateTask
);

router.patch(
    '/:id',
    authMiddleware,
    patchTask
);

router.delete(
    '/:id',
    authMiddleware,
    deleteTask
);

module.exports =
    router;