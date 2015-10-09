var Reflux = require('reflux');
var HomeActions = require('../actions/HomeActions');
var Api = require('../api/api'); 

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

  onGetAllCards () {
    Api.getAllCards(function(response){
      HomeActions.getAllCards.completed(response);
    });
  },

  onGetAllCardsCompleted (response){
    console.log(response);
    this.cards = response;
    this.changed();
  },


  changed () {
    this.trigger(this.getState());
  }

});

module.exports = HomeStore;