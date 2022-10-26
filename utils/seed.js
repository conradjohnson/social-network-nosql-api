const connection = require('../config/connection');
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');
const { userData, thoughtData, reactionData, genRandomIndex, getRandomThought } = require('./data');

connection.on('error', (err) => err);

// Get a random item given an array
const randomField = (arr, field) => arr[Math.floor(Math.random() * arr.length)].field;
const randomUsername = (arr) => arr[Math.floor(Math.random() * arr.length)].username;
const randomReaction = (arr) => arr[Math.floor(Math.random() * arr.length)].reactionBody;
const randomThought = (arr)=> arr[Math.floor(Math.random() * arr.length)].thoughtText;

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});


    const users = [];
    const thoughts = [];
    const reactions = [];

    //Function to make a thought object and push it to the thoughts array
    const makeThought = (text) => {
        thoughts.push({
          thoughtText: randomThought(thoughtData),
          username: randomUsername(userData),
          reactions: [ reactions[genRandomIndex(reactions)], reactions[genRandomIndex(reactions)] ],
        });
      };

    // populate a reactions array for random seeding:
    reactionData.forEach((obj)=>reactions.push({
        _id: new ObjectId(),
        reactionBody: obj.reactionBody,
        username:randomUsername(userData) }));

    console.log(reactions);
    thoughtData.forEach((thought) => makeThought(thought));

    await Thought.collection.insertMany(thoughts);

    const thoughtResults = await Thought.find()
    .then((thoughts) => thoughts)
    .catch((err) => console.log(err));
    // then for each thought in the db, use the username to populate our users, and grab the thought ID
     
    await User.collection.insertMany(userData);
    
   
    for (const thought of thoughtResults) {
        
    
    
         
        console.log('username' +  thought.username);
        //console.log('thought: ' + thought);
        console.log('thoughtid: ' + thought._id);
        
        let updatedUser = await User.findOneAndUpdate(
            { username: thought.username },
            {$push: {thoughts:ObjectId(thought._id)}},
            {new:true}
        )
        console.log("updated!" + updatedUser);
           
   }
   // now get users to update their friends list

    const userResults = await User.find()
    .then((users) => users)
    .catch((err) => console.log(err));

    for (const user of userResults){
        let friends = [];
        friends.push(ObjectId(userResults[genRandomIndex(userResults)]._id))
        friends.push(ObjectId(userResults[genRandomIndex(userResults)]._id))
        let updatedUser = await User.findOneAndUpdate(
            { _id: ObjectId(user._id) },
            {$push: {friends:[...friends]}},
            {new:true}
        )
        console.log(updatedUser);
    }
    
    console.info('Seeding complete! 🌱');
    process.exit(0);
})