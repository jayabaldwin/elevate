const router = require('express').Router();
const { Project, Workspace, User, Group } = require('../../models');
const withAuth = require('../../utils/auth');

//Opening to see projects, will display all projects
router.get('/', withAuth, async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [
                { model: Workspace}, 
                {model: User, attributes: ['name'] }
            ],
        });
        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Testing
// router.get('/', async (req, res) => {
//     try {
//         const projectData = await Project.findAll({
//             include: [{ model: Group}],
//         });
//         res.status(200).json(projectData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
//Selecting a project will display individual project by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
    include: [{ model: Workspace }, { model: User, attributes: ['name'], }] 
    });

    if (!projectData) {
        res.status(404).json({ message: 'Error finding Project matching this id'})
        return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Creating new project
router.post('/', withAuth, async (req, res) => {
    try {
        const newProject = await Project.create({
         ...req.body,
         workspace_id: req.session.workspace_id,
         user_id: req.session.user_id,
        });
        res.status(200).json(newProject);
    } catch (err) {
        res.json(500).json(err);
    }
});

//Marking Project as complete

module.exports = router;