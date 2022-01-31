const {
  Thought,
  User
} = require('../models');
const reactionsSchema = require('../models/Reaction');

module.exports = {


  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({
        _id: req.params.thoughtId
      })
      .select('-__v')
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No user with that ID'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({
          username: req.body.username
        }, {
          $addToSet: {
            thoughts: thought._id
          }
        }, {
          new: true
        })
      })
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'Thought created, but found no user with that ID'
        }) :
        res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },
  //Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({
        _id: req.params.thoughtId
      })
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No such thought exists'
        }) :
        res.json({
          thought,
          message: 'Thought successfully deleted 🎉'
        }))
    
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Add a reaction to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $addToSet: {
          reactions: req.body
        }
      }, {
        new: true,
        runValidators: true
      }, )
      .select('-__v')
      .then((thought) => {
        !thought
          ?
          res.status(404).json({
            message: 'No thought with that ID'
          }) :
          res.json({
            thought,
            message: 'Reaction sucessfully created 🎉'
          })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },
  //Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId
          }
        }
      }, {
        new: true,
        runValidators: true
      }, )
      .select('-__v')
      .then((thought) => {
        !thought
          ?
          res.status(404).json({
            message: 'No thought with that ID'
          }) :
          res.json(thought)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  }
}