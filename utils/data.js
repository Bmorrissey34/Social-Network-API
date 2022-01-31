  const userData = [
    { username: 'brendanmorrissey', email: 'jstndhouk@gmail.com'},
    {username: 'cartergarrison', email: 'carterg@gmail.com'},
    {username: 'martinmaier', email: 'martinm@gmail.com'},
    {username: 'ryanyancy', email: 'ryany@gmail.com'}
  ];

  const thoughtsData = [
    {thoughtText: 'This is a thought by Brendan', username: 'brendanmorrissey', },
    {thoughtText: 'This is a thought by Carter', username: 'cartergarrison'},
    {thoughtText: 'This is a thought by Martin', username: 'martinmaier'},
    {thoughtText: 'This is a thought by Ryan', username: 'ryanyancy'},
    {thoughtText: 'This is a second thought by Justin', username: 'brendanmorrissey'},
    {thoughtText: 'This is a second thought by Carter', username: 'cartergarrison'},
  ];

// Export the functions for use in seed.js
module.exports = { thoughtsData, userData };
