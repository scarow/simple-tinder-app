var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Home = require('./components/Home');
var config = require('config');
// declare our routes and their hierarchy
module.exports = (
  <Route>
    <Route handler={Home} name="Home" path={config.rootPath}/>
  </Route>
);