var Reflux = require('reflux');

var actions = Reflux.createActions({
  getNextBatch: { children: ['completed', 'failed']},
  swipeRight: {},
  removeCard: {}
});

module.exports = actions;