const User = require('../models/User');
const Thought = require('../models/Thought');
const { USVString } = require('webidl-conversions');
const { ObjectId } = require('mongoose').Types;

// GET all users : /api/users
function getUsers (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err.message));
}

//GET user by id : /api/users/:userId
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err.message));
}

// POST user : /api/users
function createUser(req, res) {
  User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err.message));
}

// UPDATE user: /api/users/:userId
function updateUser(req, res) {

  User.findOneAndUpdate(
    {_id: ObjectId(req.params.userId)},
    {$set: req.body},
    {runValidators:true, new: true}
  )
  .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err.message));
}

// DELETE user: /api/users/:userId
async function deleteUser(req, res) {
  //remove user
  let deletedUser = await User.findOneAndDelete({_id: ObjectId(req.params.userId)})
  console.log(deletedUser);
  if (!deletedUser){
       res.status(404).json({ message: 'No user with that ID' });
       return
      }
  // remove thoughts
  await Thought.deleteMany({ username: deletedUser.username });
  
  // remove from other friends' friends array
  await User.updateMany({$pull: {friends:ObjectId(req.params.userId)}});
  
  res.json(deletedUser);
   
  
}

// POST new Friend : /api/users/friends/:friendId
async function addFriend(req, res) {
  // make sure friend is valid
  let validFriend = await User.findById({_id:ObjectId(req.params.friendId)});
  if (validFriend._id){
    //add to friend list
   let user = await User.findOneAndUpdate(
      {_id: ObjectId(req.params.userId)},
      {$addToSet: {friends:ObjectId(req.params.friendId)}},
      {runValidators:true, new: true}
      )
   if (!user) {
    res.status(404).json({ message: 'No user with this id!' })
    return
    } 
  // add user to friend's friends array
   let friend = await User.findOneAndUpdate(
            {_id: ObjectId(req.params.friendId)},
            {$addToSet: {friends:ObjectId(req.params.userId)}},
            {runValidators:true, new: true}
          )
   if (user && friend)  {     
          res.json(user);
    }
    else{res.status(404).json({ message: 'No friend with this id!' })}
    
  }
    else{
      res.status(404).json({ message: 'No friend with this id!' })
    }
}

// DELETE Friend by ID : /api/users/:userId/friends/:friendId
async function deleteFriend(req, res) {
  // if valid Friend
  let validFriend = await User.findById({_id:ObjectId(req.params.friendId)});
  if (validFriend._id){
    // remove friend from user's friends array
    let user = await User.findOneAndUpdate(
      {_id: ObjectId(req.params.userId)},
      {$pull: {friends:ObjectId(req.params.friendId)}},
      {runValidators:true, new: true}
      )
   if (!user) {
    res.status(404).json({ message: 'No user with this id!' })
    return
    } 
  // remove user from friend's friends array
   let friend = await User.findOneAndUpdate(
            {_id: ObjectId(req.params.friendId)},
            {$pull: {friends:ObjectId(req.params.userId)}},
            {runValidators:true, new: true}
          )
   if (user && friend)  {     
          res.json(user);
    }
    else{res.status(404).json({ message: 'No friend with this id!' })}
    
  }
    else{
      res.status(404).json({ message: 'No friend with this id!' })
    }
}

module.exports = {
 getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend
};
