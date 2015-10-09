'use strict'
var React = require('react');

var Card = React.createClass({
  getDefaultProps(){
    return {
      card: {}
    };
  },
  render(){
    var card = this.props.card;
    return (
      <div>
        <img src={ card.prof_photo } style={{ maxWidth: '300px'}} />
        { card.name }
        { card.sex }
        { card.age }
        { card.location }
      </div>
    );
  }
})

module.exports = Card;