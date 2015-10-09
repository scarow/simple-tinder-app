'use strict'
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var RouteHandler = Router.RouteHandler;
var Card = require('../Card');
var HomeActions = require('../../actions/HomeActions');
var HomeStore = require('../../stores/HomeStore');

var Home = React.createClass({
  mixins: [
    Reflux.connect(HomeStore)
  ],
  getInitialState(){
    return {
      cards: []
    };
  },
  componentDidMount(){
    this.listenTo(HomeStore, this._onChange);
    HomeActions.getAllCards();
  },

  _onChange(data) {
    this.setState(data);
  },
  render(){
    var cards = this.state.cards;
    return (
      <div>
        Home page
        {
          cards.map(function(card){
            return ( <Card card={ card } key={ card.id }/> );
          })
        }
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Home;