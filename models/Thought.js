const { Schema, model, Types } = require('mongoose');
const reactionsSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      max_length: 280,
      min_length: 1
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema]
  },
 {
   toJSON: {getters:true}, id:false
 }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
