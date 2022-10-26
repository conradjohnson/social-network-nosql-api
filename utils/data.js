//users seed example data
const userData = [
{
    username: "Jimmy",
    email:'jerer@gmc.com'
},
{
    username: "James",
    email:'james@gmc.com'
},
{
    username: "Jimbo",
    email:'jimbo@gmc.com'
},
{
    username: "Jimba",
    email:'jimba@gmc.com'
},
{
    username: "James2",
    email:'james2@gmc.com'
},
{
    username: "Jamie",
    email:'jamie@gmc.com'
},
{
    username: "OtherJames",
    email:'OJ@gmc.com'
},

];

// thoughts seed example data
const thoughtData = [
    {
        thoughtText: "Which statement is correct? A bottle is half-filled or a bottle half empty."

    },
    {
        thoughtText: "Saying ‘sorry’ and ‘thank you’ too often is a sign of courtesy that everyone does and few only feel."

    },
    {
        thoughtText: "Why is Valentine’s Day celebrated with red roses, red dress, red cards, and red lipstick? Will it look odd, if any other color is used to celebrate the day? Will it be worth it?"

    },
    {
        thoughtText: "Celebrating birthdays is a reminder that we have one less year to live in this world."

    },
    {
        thoughtText: "Have you ever tried sleeping with eyes wide open? "

    },
    {
        thoughtText: "Can we have a new world only with short men and tall women?"

    },
    {
        thoughtText: "Incorrect is spelled incorrect in a dictionary."

    },
    {
        thoughtText: "Twins are like buy one, get one free. Isn’t it great?"

    },
    {
        thoughtText: "A spoon made of gold can be called silverware? Right?"

    },
    {
        thoughtText: "A pancake is not a cake."

    },
    {
        thoughtText: "Everyone remembers what you did in your childhood; except you. Were you drunk?"

    },
]

// reactions seed example data
const reactionData = [
    {
        reactionBody: "Cool"

    },
    {
        reactionBody: "Very Cool"

    },
    {
        reactionBody: "Drool "

    },
    {
        reactionBody: "This is STUPID"

    },
    {
        reactionBody: "Casey did it better"

    },
    {
        reactionBody: "Citations needed."

    },
    {
        reactionBody: "NOOB"

    },
    {
        reactionBody: "That's what I said"

    },
    {
        reactionBody: "Nice steal"

    },
    {
        reactionBody: "Plagarist!"

    },
    {
        reactionBody: "VERY VERY VERY COOL"

    },
    {
        reactionBody: "Not cool bro, think of the dolphins."

    },

]

// seed helper functions
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomThought = () => {
     return thoughtData[genRandomIndex(thoughtData)];
  };

module.exports = {userData, thoughtData, reactionData, genRandomIndex, getRandomThought}