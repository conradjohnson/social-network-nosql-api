const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');
// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: moment().format('YYYY-MM-DD hh:mm:ss'),
      get: (date)=>{ return moment(date).format('YYYY-MM-DD hh:mm:ss')},
    },
    username: {
      type: String,
      required: true,
    },
        
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    
  }
);

// `reactionCount` gets the amount of reactions.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;