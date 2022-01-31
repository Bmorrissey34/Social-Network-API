const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought)
// .post(createReaction)
router.route('/:thoughtId/reaction').post(createReaction)
router.route('/:thoughtId/:reactionId').delete(deleteReaction);
module.exports = router;
