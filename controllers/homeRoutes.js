const router = require('express').Router();
const { User } = require('../models');

// Homepage
// router.get('/', async (req, res) => {
//   try {
//     const postData = await BlogPost.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     const postsData = postData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       postsData,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // Change endpoint
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
