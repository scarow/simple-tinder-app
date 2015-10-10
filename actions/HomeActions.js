var Reflux = require('reflux');

var actions = Reflux.createActions({
  getNextBatch: { children: ['completed', 'failed']},
  removeCard: {}
});

module.exports = actions;