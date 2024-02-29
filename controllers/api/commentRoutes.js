const router = require('express').Router();
const { Comment, User } = require('../../models');
// end route is /api/comment

// get all comments
router.get('/', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    // Task route must include comments
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['first', 'last'],
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('comment', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add comment into the db upon clicking 'add' in the comments section below the specified task
// Include comment, created on and link via the user id and task id
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(201).json(commentData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// update comment by id value
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete comment by id
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
