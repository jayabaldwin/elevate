const router = require('express').Router();
const { ChatLine, User } = require('../../models');
// end route is /api/chat

// Get all tasks
router.get('/:id', async (req, res) => {
    try {
        const chatData = await ChatLine.findAll({
            where: { project_id: req.params.id },
            include: [{ model: User, attributes: ['first'] }]
        });
        res.status(200).json(chatData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newChatLine = await ChatLine.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newChatLine);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
