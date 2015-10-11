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
    this.setState(data);
  },
  handleSwipe(direction){
    if (direction > 0){
      HomeActions.swipeRight();
    } else if (direction < 0){
      HomeActions.removeCard();
    }
  },

  // for draggable
  handleStop(event, ui) {
    console.log(ui.position);
    if(ui.position.left < -maxMove || ui.position.left > maxMove){
      this.handleSwipe(ui.position.left);
    } else {
      // TO DO:
      console.log('should pop back');
      //pop back to initial position
    }

    // console.log('Event: ', event);
    // console.log('Position: ', ui.position);
  },

  render(){
    // TO DO: cards should always start in the same place
    var topCard = this.state.cards[0];
    var nextUp = this.state.cards[1];
    return (
      <div className='stack' style={ styles.stack }>
        { /*<Hammer onSwipe={this.handleSwipe}> */ }
          <Draggable
            axis="both"
            handle=".handle"
            start={{x: 0, y: 0}}
            moveOnStartChange={false}
            grid={[25, 25]}
            zIndex={100}
            onStop={this.handleStop}>
            <div>
              <div className='handle'> drag </div>
              <Card  {...this.props} card={ topCard } isTop={true}/>
            </div>
          </Draggable>
        { /*</Hammer>*/}
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