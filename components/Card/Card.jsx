'use strict'
var React = require('react');
var Radium = require('radium');

var Card = React.createClass({
  getDefaultProps(){
    return {
      card: {},
      isTop: null
    };
  },
  render(){
    var card = this.props.card;
    var top = this.props.isTop;
    return (
      <div style={ top ? [styles.top, styles.bottom] : styles.bottom}>
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
    width: '75%',
    margin: 'auto'
  },

  profilePic: {
    width: '300px',
    height: '300px',
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
    padding: 5
  }
}

module.exports = Radium(Card);
