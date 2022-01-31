const {
  Schema,
  model
} = require('mongoose');

// Schema to create Student model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  }],
  friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }

  ],

}, {
  toJSON: {
    getters: true
  },
  id: false
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;