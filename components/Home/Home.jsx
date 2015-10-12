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
      HomeActions.swipeRight();
    } else if (direction < 0){
      HomeActions.removeCard();
    }
  },

  handleStop(event, ui) {
    if(ui.position.left < -maxMove || ui.position.left > maxMove && this.state.cards.length > 0){
      this.handleSwipe(ui.position.left);
    } else {
      this.refs.draggable.resetState();
    }
  },

  render(){
    var topCard = this.state.cards[0];
    var nextUp = this.state.cards[1];
    var cardCount = this.state.cards.length;
    return (
      <div className='stack' style={ styles.stack }>
        <Draggable
          ref="draggable"
          axis="both"
          start={{x: 0, y: 0}}
          moveOnStartChange={false}
          grid={[25, 25]}
          zIndex={100}
          onStop={this.handleStop}>
          <div>
            <Card {...this.props} card={ topCard } isTop={true}/>
          </div>
        </Draggable>
        <div>
          {
            function(){
              if(cardCount > 1){
                return (
                  <Card card={ nextUp } isTop={false}/>
                )
              }
            }.call(this)
          }
        </div>
      </div>
    );
  }
});

var styles = {
  stack: {
    height: '80%',
    width: '80%',
    padding: 0,
    position: 'relative',
    margin: '0 auto'
  }
}
module.exports = Radium(Home);