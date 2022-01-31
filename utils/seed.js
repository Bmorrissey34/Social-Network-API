const connection = require('../config/connection');
const { Reaction, User, Thought } = require('../models');
const { userData, thoughtsData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  // await Reaction.deleteMany({});
  // // Drop existing students
  // await User.deleteMany({});
  // await Thought.deleteMany({});

  // Add students to the collection and await the results
  await User.collection.insertMany(userData);
  await Thought.collection.insertMany(thoughtsData);

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.table(thoughtsData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
