'use strict'
var React = require('react');
var Radium = require('radium');
var HomeActions = require('../../actions/HomeActions');
var HomeStore = require('../../stores/HomeStore');

var Card = React.createClass({
  getDefaultProps(){
    return {
      card: null,
      isTop: null
    };
  },

  onClick(){
    HomeActions.removeCard();
  },

  render(){
    var card = this.props.card;
    var top = this.props.isTop;
    var cardData;
    if (!card){
      cardData = (
        <div>
          Fetching new potential matches!
        </div>
      );
    } else if (card.match){
      cardData = (
        <div>
          You got a match!
          <br/>
          <button onClick={ this.onClick }> Got it </button>
        </div>
      );
    } else{
      cardData = (
        <div>
          <div style={ styles.profilePic}>
            <img src={ card.prof_photo } style={styles.image} /><br/>
          </div>
          <div style={styles.info}>
            { card.name }, { card.age }<br/>
            { card.location }
          </div>
        </div>
      );
    }
    return (
      <div {...this.props} style={ top ? [styles.top, styles.bottom] : styles.bottom}>
        { cardData }
      </div>
    );
  }
})

var styles = {
  top: {
    position: 'absolute'
  },

  bottom: {
    background: 'lightgray',
    border: '1px solid black',
    borderRadius: 6,
    padding: 10,
    textAlign: 'center',
    width: '100%',
    top: 10,
    left: 10,
    margin: 'auto',
    height: 400
  },

  profilePic: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },

  info: {
    background: 'white',
    borderRadius: 10,
    width: '50%',
    margin: 'auto'
  },

  image: {
    borderRadius: 10,
    maxWidth: 300,
    maxHeight: 300,
    padding: 5
  }
}

module.exports = Radium(Card);
