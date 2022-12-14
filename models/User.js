const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 45,
      trim: true
    },
    email:{ 
      type: String,
      required: true,
      unique: true,
      trim: true,
      match:[/.+\@.+\..+/, 'invalid email']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends:[
      {
        type: Schema.Types.ObjectId, 
        ref:'user'
      }
       
    ]
  },
  {
    // virtuals included for friendCount
    toJSON: {
      virtuals: true,
    }
  }
);

// Create a virtual property `friendCount` that gets and sets the user's friend count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
 

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
