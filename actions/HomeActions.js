var Reflux = require('reflux');

var actions = Reflux.createActions({
  getNextCard: {children: ['completed', 'failed']},
  getAllCards: { children: ['completed', 'failed']}
});

module.exports = actions;