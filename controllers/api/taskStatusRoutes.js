// const router = require('express').Router();
// const { Task } = require('../../models');

// router.get('/home', async (req, res) => {
//     try {
//         const toDoTasks = await Task.findAll({ where: { status: 'to-do'} });
//         const inProgressTasks = await Task.findAll({ where: { status: 'in-progress' } });
//         const completedTasks = await Task.findAll({ where: { status: 'completed' } });

//         res.render('home', {
//             tasks: {
//                 toDo: toDoTasks.map(task => task.get({ plain: true })),
//                 inProgress: inProgressTasks.map(task => task.get({ plain: true })),
//                 completed: completedTasks.map(task => task.get({ plain: true }))
//             }
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;