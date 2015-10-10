'use strict'
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var RouteHandler = Router.RouteHandler;
var Card = require('../Card');
var HomeActions = require('../../actions/HomeActions');
var HomeStore = require('../../stores/HomeStore');
var Hammer = require('react-hammerjs');
var Radium = require('radium');

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
    HomeActions.getNextBatch();
  },

  _onChange(data) {
    this.setState(data);
  },
  handleSwipe(topCard){
    // TO DO: swipe direction needs to be handled
    // if swipe left
    HomeActions.removeCard();
    // if swipe right, show it's a match
  },
  render(){
    var topCard = this.state.cards[0];
    var nextUp = this.state.cards[1];
    return (
      <div className='stack' style={ styles.stack }>
        <Hammer onSwipe={this.handleSwipe}>
          <div>
            <Card card={ topCard } isTop={true}/>
          </div>
        </Hammer>
        <div>
          <Card card={ nextUp } isTop={false}/>
        </div>
      </div>
    );
  }
});

var styles = {
  stack: {
    margin: '20px auto',
    width: '400px',
    padding: 0,
    position: 'relative',
    maxWidth: '100%'
  }
}
module.exports = Radium(Home);