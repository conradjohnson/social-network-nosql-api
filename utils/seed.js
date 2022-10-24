const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData, reactionData } = require('./data');

connection.on('error', (err) => err);

// Get a random item given an array
const randomUsername = (arr) => arr[Math.floor(Math.random() * arr.length)].username;
const randomReaction = (arr) => arr[Math.floor(Math.random() * arr.length)].reactionBody;


connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});


    // Add users to the collection and await the results
    await User.collection.insertMany(userData);

    // build randomized thought array
    let thoughtArray = [];
    let reactionArray = [];

    //for each thought, generate a random username, and 3 random reactions, each with random user names
    for (let i=0; i< thoughtData.length; i++){
        //generate random reaction array
        let reactionObj = {};
        //reactionArray = [];
        for (let j=0; j<3; j++){
            reactionObj = {
                reactionBody: randomReaction(reactionData),
                username: randomUsername(userData)
            }
            reactionArray.push(reactionObj);
        }
        const thoughtObj = {
            thoughtText: thoughtData[i].thoughtText,
            username: randomUsername(userData),
            reactions: reactionArray,
        }
        thoughtArray.push(thoughtObj);
        reactionArray = [];

    }

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughtArray);
    
    console.info('Seeding complete! 🌱');
    process.exit(0);
})