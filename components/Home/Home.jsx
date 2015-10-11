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
var Draggable = require('react-draggable');

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
  handleSwipe(){
    // TO DO: swipe direction needs to be handled
    // if swipe left
    HomeActions.removeCard();
    // if swipe right, show it's a match
  },

  // for draggable
  handleStart(event, ui) {
    console.log('Event: ', event);
    console.log('Position: ', ui.position);
  },

  handleDrag(event, ui) {
    console.log('Event: ', event);
    console.log('Position: ', ui.position);
  },

  handleStop(event, ui) {
    console.log('Event: ', event);
    console.log('Position: ', ui.position);
  },

  render(){
    var topCard = this.state.cards[0];
    var nextUp = this.state.cards[1];
    return (
      <div className='stack' style={ styles.stack }>
        <Hammer onSwipe={this.handleSwipe}>
          <Draggable
            axis="both"
            handle=".handle"
            start={{x: 0, y: 0}}
            moveOnStartChange={false}
            grid={[25, 25]}
            zIndex={100}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
              <div className='handle'> drag </div>
              <Card  {...this.props} card={ topCard } isTop={true}/>
            </div>
          </Draggable>
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