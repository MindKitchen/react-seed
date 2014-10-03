/** @jsx React.DOM */
/*jshint unused:false*/
"use strict";
var React = require("react");
var Router = require("react-router-component");
var Link = Router.Link;

module.exports = React.createClass({
  render: function () {
    /*jshint ignore:start*/
    return (
      <header>
        <Link href="/">Home</Link>
      </header>
    );
    /*jshint ignore:end*/
  }
});
