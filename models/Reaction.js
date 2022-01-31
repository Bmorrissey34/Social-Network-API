const {
  Schema,
  Types
} = require('mongoose');

const reactionsSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    require: true,
    max_length: 280,
    min_length: 1
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});


module.exports = reactionsSchema;