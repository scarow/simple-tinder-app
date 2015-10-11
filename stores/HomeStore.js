var Reflux = require('reflux');
var HomeActions = require('../actions/HomeActions');
var Api = require('../api/api');
var limit = 5;
var offset = 0;

var HomeStore = Reflux.createStore({
  listenables: HomeActions,

  init () {
    this.cards = [];
  },

  getState () {
    return {
      cards: this.cards
    };
  },

  onRemoveCard(){
    if (this.cards.length > 1){
      this.cards.shift();
      this.changed();
    } else {
      HomeActions.getNextBatch();
    }
  },

  onGetNextBatch () {
    var params = {
      limit: limit,
      offset: offset
    };
    Api.getNextBatch(params, function(response){
      HomeActions.getNextBatch.completed(response);
    });
  },

  onGetNextBatchCompleted (response){
    offset = offset + limit;
    this.cards = response;
    this.changed();
  },

  onSwipeRight(){
    this.cards.shift();
    this.cards.unshift({
      match: true,
      isTop: true
    });
    this.changed();
  },

  changed () {
    this.trigger(this.getState());
  }

});

module.exports = HomeStore;