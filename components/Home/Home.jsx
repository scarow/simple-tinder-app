'use strict'
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var RouteHandler = Router.RouteHandler;
var Card = require('../Card');
var HomeActions = require('../../actions/HomeActions');
var HomeStore = require('../../stores/HomeStore');
var Hammer = require('react-hammerjs');
var options = {touchAction:true, recognizers:{tap:{time:600, threshold:100}}};

var Home = React.createClass({
  mixins: [
    Reflux.connect(HomeStore)
  ],
  getInitialState(){
    return {
      cards: [],
      index: 0
    };
  },
  componentDidMount(){
    this.listenTo(HomeStore, this._onChange);
    HomeActions.getAllCards();
  },

  _onChange(data) {
    this.setState(data);
  },
  handleSwipe(){
    console.log('handleSwipe');
    this.setState({ index: this.state.index + 1});
  },
  render(){
    console.log(this.state);
    var cards = this.state.cards;

    var card = this.state.cards[this.state.index];

    return (
      <div>
        <Hammer onSwipe={this.handleSwipe} style={{ border: '1px solid black' }}>
          <div>
            <Card card={ card }/>
          </div>
        </Hammer>
      </div>
    );
    // return (
    //   <div>
    //     Home page
    //     {
    //       cards.map(function(card){
    //         return ( <Card card={ card } key={ card.id }/> );
    //       })
    //     }
    //     <RouteHandler />
    //   </div>
    // );
  }
});

module.exports = Home;