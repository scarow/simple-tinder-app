'use strict'
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var RouteHandler = Router.RouteHandler;
var Card = require('../Card');
var HomeActions = require('../../actions/HomeActions');
var HomeStore = require('../../stores/HomeStore');
var Radium = require('radium');
var Draggable = require('react-draggable');
var maxMove = 50;

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
    this.refs.draggable.resetState();
    this.setState(data);
  },
  handleSwipe(direction){
    if (direction > 0){
      // TO DO: should i disable swiping on 'its a match'?
      HomeActions.swipeRight();
    } else if (direction < 0){
      HomeActions.removeCard();
    }
  },

  handleStop(event, ui) {
    if(ui.position.left < -maxMove || ui.position.left > maxMove){
      this.handleSwipe(ui.position.left);
    } else {
      this.refs.draggable.resetState();
    }
  },

  render(){
    var topCard = this.state.cards[0];
    var nextUp = this.state.cards[1];
    return (
      <div className='stack' style={ styles.stack }>
        <Draggable
          ref="draggable"
          axis="both"
          handle=".handle"
          start={{x: 0, y: 0}}
          moveOnStartChange={false}
          grid={[25, 25]}
          zIndex={100}
          onStop={this.handleStop}>
          <div>
            <div className='handle'> Drag here </div>
            <Card {...this.props} card={ topCard } isTop={true}/>
          </div>
        </Draggable>
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