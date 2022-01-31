const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);
    
module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v').populate('thoughts').populate('friends')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json({user, message: 'User successfully deleted' }))
          //BONUS
          // : Thought.findOneAndUpdate(
          //     { user: req.params.userId },
          //     { $pull: { thoughts: req.params.thoughtId } },
          //     { new: true }
          //   )
      // ) thought.deleteMany
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//Update a user
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {username: req.body.username, email: req.body.email}, {new:true})
     .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user, message: 'The user has been updated!'
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });

  },
  //Add a friend to a user's friends list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {$addToSet: {friends: req.params.friendId}}, {new:true, runValidators:true}, )
      .select('-__v')
      .then((user) =>{
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({user, message: 'Friend sucessfully added 🎉'})})
        .catch((err) => {
         console.log(err);
         return res.status(500).json(err);
        })
  },
  //Delete a friend of a user's friend list.
  deleteFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {$pull: {friends: req.params.friendId}}, {new:true, runValidators:true}, )
      .select('-__v')
      .then((user) =>{
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({user, message: 'Friend sucessfully deleted 🎉'})})
        .catch((err) => {
         console.log(err);
         return res.status(500).json(err);
        })
  },
}